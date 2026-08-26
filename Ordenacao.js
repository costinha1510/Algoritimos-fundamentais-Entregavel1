const readline = require("readline");

const teclado = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

teclado.question("Digite os numeros separados por espaco: ", (entrada) => {

    let vetor = entrada.split(" ").map(Number);

    function quicksort(vetor, inicio, fim) {

        if (inicio < fim) {

            let pivo = vetor[fim];
            let i = inicio - 1;

            for (let j = inicio; j < fim; j++) {

                if (vetor[j] <= pivo) {
                    i++;

                    let temp = vetor[i];
                    vetor[i] = vetor[j];
                    vetor[j] = temp;
                }
            }

            let temp = vetor[i + 1];
            vetor[i + 1] = vetor[fim];
            vetor[fim] = temp;

            let posicaoPivo = i + 1;

            quicksort(vetor, inicio, posicaoPivo - 1);
            quicksort(vetor, posicaoPivo + 1, fim);
        }
    }

    quicksort(vetor, 0, vetor.length - 1);

    console.log("Array ordenado:");
    console.log(vetor.join(" "));

    teclado.close();
});