const readline = require("readline");

const entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let soma = 0;
let i = 0;

entrada.question("Informe a quantidade de numeros: ", function(n) {

    n = parseInt(n);

    function pedirNumero() {

        if (i < n) {

            entrada.question("Digite um numero: ", function(numero) {

                numero = parseInt(numero);

                soma += numero;
                i++;

                pedirNumero();
            });

        } else {

            console.log("Somatorio: " + soma);
            entrada.close();
        }
    }

    pedirNumero();
});