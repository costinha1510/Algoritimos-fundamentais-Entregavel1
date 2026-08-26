const readline = require("readline");

const teclado = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

teclado.question("Digite a quantidade de termos: ", function(n) {

    n = parseInt(n);

    let a = 0;
    let b = 1;
    let proximo;

    for (let i = 0; i < n; i++) {
        console.log(a);

        proximo = a + b;
        a = b;
        b = proximo;
    }

    teclado.close();
});