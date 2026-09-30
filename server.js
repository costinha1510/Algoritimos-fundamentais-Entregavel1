const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const algorithms = new Set(['fibonacci', 'mdc', 'primo', 'ordenacao', 'somatorio', 'contagem']);
const javaClasses = { fibonacci: ['Fibonacci.java', 'Fibonacci'], mdc: ['MDC.java', 'MDC'], primo: ['Primo.java', 'Primo'], ordenacao: ['ordenacao.java', 'ordenacao'], somatorio: ['Somatorio.java', 'Somatorio'], contagem: ['Contagem.java', 'Contagem'] };

function parseValues(text) {
  const values = String(text).trim().split(/[\s,;]+/).filter(Boolean).map(Number);
  if (!values.length || values.some(value => !Number.isFinite(value))) throw new Error('Use apenas números válidos na lista.');
  return values;
}

function executeJavaScript(algorithm, input) {
  const integer = value => { const number = Number(value); if (!Number.isSafeInteger(number)) throw new Error('Digite um número inteiro válido.'); return number; };
  switch (algorithm) {
    case 'fibonacci': {
      const n = integer(input.n); if (n < 0 || n > 1000) throw new Error('A quantidade deve ficar entre 0 e 1000.');
      let a = 0, b = 1; const terms = [];
      for (let i = 0; i < n; i++) { terms.push(a); [a, b] = [b, a + b]; }
      return `Sequência (${n} termos):\n${terms.join('  ') || '—'}`;
    }
    case 'mdc': {
      let a = Math.abs(integer(input.a)), b = Math.abs(integer(input.b));
      while (b !== 0) [a, b] = [b, a % b];
      return `O MDC é: ${a}`;
    }
    case 'primo': {
      const n = integer(input.n); let prime = n >= 2;
      for (let i = 2; prime && i <= Math.sqrt(n); i++) if (n % i === 0) prime = false;
      return prime ? `${n} é primo!` : `${n} não é primo.`;
    }
    case 'ordenacao': return `Array ordenado:\n${parseValues(input.values).sort((a, b) => a - b).join('  ')}`;
    case 'somatorio': return `Somatório: ${parseValues(input.values).reduce((sum, value) => sum + value, 0)}`;
    case 'contagem': {
      const n = integer(input.n), values = parseValues(input.values);
      if (n < 1 || values.length !== n) throw new Error('Informe exatamente N valores, com N maior que zero.');
      return `Quantidade de valores entre 1 e ${n}: ${values.filter(value => value >= 1 && value <= n).length}`;
    }
  }
}

function javaInput(algorithm, input) {
  const values = algorithm === 'ordenacao' || algorithm === 'somatorio' || algorithm === 'contagem' ? parseValues(input.values).map(value => {
    if (!Number.isSafeInteger(value)) throw new Error('Este exercício Java aceita apenas números inteiros.'); return value;
  }) : [];
  if (algorithm === 'fibonacci') { const n = Number(input.n); if (!Number.isInteger(n) || n < 0 || n > 1000) throw new Error('A quantidade deve ficar entre 0 e 1000.'); return `${n}\n`; }
  if (algorithm === 'mdc') return `${Number(input.a)}\n${Number(input.b)}\n`;
  if (algorithm === 'primo') return `${Number(input.n)}\n`;
  if (algorithm === 'ordenacao' || algorithm === 'somatorio') return `${values.length}\n${values.join('\n')}\n`;
  const n = Number(input.n);
  if (!Number.isInteger(n) || n < 1 || values.length !== n) throw new Error('Informe exatamente N valores, com N maior que zero.');
  return `${n}\n${values.join('\n')}\n`;
}

function runProcess(command, args, input, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options, windowsHide: true });
    let stdout = '', stderr = '';
    child.stdout.on('data', data => { stdout += data; });
    child.stderr.on('data', data => { stderr += data; });
    child.on('error', error => reject(new Error(error.code === 'ENOENT' ? 'Java não está instalado ou javac/java não está no PATH.' : error.message)));
    child.on('close', code => code === 0 ? resolve(stdout.trim()) : reject(new Error(stderr.trim() || `O processo terminou com código ${code}.`)));
    child.stdin.end(input);
  });
}

async function executeJava(algorithm, input) {
  const [source, className] = javaClasses[algorithm];
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'algoritmos-java-'));
  try {
    await runProcess('javac', ['-encoding', 'UTF-8', '-d', temp, path.join(root, source)], '');
    return await runProcess('java', ['-cp', temp, className], javaInput(algorithm, input));
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  response.end(JSON.stringify(payload));
}

http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') { response.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }); response.end(); return; }
  if (request.method === 'POST' && request.url === '/api/run') {
    let body = '';
    request.on('data', chunk => { body += chunk; if (body.length > 100_000) request.destroy(); });
    request.on('end', async () => {
      try {
        const { algorithm, language, input } = JSON.parse(body);
        if (!algorithms.has(algorithm) || !input || !['java', 'javascript'].includes(language)) throw new Error('Algoritmo ou linguagem inválidos.');
        const output = language === 'java' ? await executeJava(algorithm, input) : executeJavaScript(algorithm, input);
        sendJson(response, 200, { output });
      } catch (error) { sendJson(response, 400, { error: error.message || 'Não foi possível executar o algoritmo.' }); }
    });
    return;
  }
  const urlPath = request.url === '/' ? '/index.html' : decodeURIComponent(request.url.split('?')[0]);
  const filePath = path.resolve(root, `.${urlPath}`);
  if (!filePath.startsWith(root + path.sep) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    response.writeHead(404); response.end('Página não encontrada.'); return;
  }
  response.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(response);
}).listen(3000, '127.0.0.1', () => console.log('Interface disponível em http://localhost:3000'));
