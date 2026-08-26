const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Digite um numero: ", (numero) => {

    numero = parseInt(numero);

    let primo = true;

    if (numero <= 1) {
        primo = false;
    }

    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            primo = false;
            break;
        }
    }

    if (primo) {
        console.log("O numero é primo");
    } else {
        console.log("O numero não é primo");
    }

    rl.close();
});