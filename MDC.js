const readline = require("readline");

const teclado = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

teclado.question("Digite o primeiro numero: ", (a) => {
    teclado.question("Digite o segundo numero: ", (b) => {
        let numero1 = Number(a);
        let numero2 = Number(b);

        if (!Number.isInteger(numero1) || !Number.isInteger(numero2)) {
            console.log("Digite apenas numeros inteiros.");
            teclado.close();
            return;
        }

        numero1 = Math.abs(numero1);
        numero2 = Math.abs(numero2);

        while (numero2 !== 0) {
            const resto = numero1 % numero2;
            numero1 = numero2;
            numero2 = resto;
        }

        console.log("O MDC e: " + numero1);
        teclado.close();
    });
});
