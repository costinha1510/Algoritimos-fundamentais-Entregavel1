const readline = require("readline");

const teclado = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

teclado.question("Digite N: ", (entrada) => {

    let n = parseInt(entrada);
    let contador = 0;
    let i = 0;

    function pedirNumero() {

        if (i < n) {

            teclado.question("Digite um numero: ", (entrada) => {

                let numero = parseInt(entrada);

                if (numero >= 1 && numero <= n) {
                    contador++;
                }

                i++;
                pedirNumero();
            });

        } else {

            console.log("Quantidade de valores entre 1 e " + n + ": " + contador);

            teclado.close();
        }
    }

    pedirNumero();
});