import java.util.Scanner;

public class ordenacao {

    public static void quicksort(int[] vetor, int inicio, int fim) {

        if (inicio < fim) {

            int pivo = vetor[fim];
            int i = inicio - 1;

            for (int j = inicio; j < fim; j++) {

                if (vetor[j] <= pivo) {
                    i++;

                    int temp = vetor[i];
                    vetor[i] = vetor[j];
                    vetor[j] = temp;
                }
            }

            int temp = vetor[i + 1];
            vetor[i + 1] = vetor[fim];
            vetor[fim] = temp;

            int posicaoPivo = i + 1;

            quicksort(vetor, inicio, posicaoPivo - 1);
            quicksort(vetor, posicaoPivo + 1, fim);
        }
    }

    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        System.out.print("Digite a quantidade de numeros: ");
        if (!teclado.hasNextInt()) {
            System.out.println("Digite uma quantidade inteira valida.");
            teclado.close();
            return;
        }

        int n = teclado.nextInt();

        if (n <= 0) {
            System.out.println("A quantidade de numeros deve ser maior que zero.");
            teclado.close();
            return;
        }

        int[] vetor = new int[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Digite o " + (i + 1) + " numero: ");
            if (!teclado.hasNextInt()) {
                System.out.println("Digite apenas numeros inteiros.");
                teclado.close();
                return;
            }
            vetor[i] = teclado.nextInt();
        }

        quicksort(vetor, 0, n - 1);

        System.out.println("Array ordenado:");

        for (int i = 0; i < n; i++) {
            System.out.print(vetor[i] + " ");
        }

        System.out.println();

        teclado.close();
    }
}
