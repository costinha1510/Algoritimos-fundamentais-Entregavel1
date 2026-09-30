document.querySelectorAll('form[data-algorithm]').forEach(form => form.addEventListener('submit', async event => {
  event.preventDefault();
  const output = form.parentElement.querySelector('output');
  const button = form.querySelector('button');
  button.disabled = true;
  output.textContent = 'Executando…';
  output.className = '';
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ algorithm: form.dataset.algorithm, language: document.querySelector('#language').value, input: Object.fromEntries(new FormData(form)) })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Não foi possível executar o algoritmo.');
    output.textContent = result.output;
    output.className = 'result';
  } catch (error) {
    output.textContent = error.message;
    output.className = 'error';
  } finally {
    button.disabled = false;
  }
}));
