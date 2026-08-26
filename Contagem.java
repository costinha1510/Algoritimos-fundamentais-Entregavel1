import java.util.Scanner;

public class Contagem {
    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        int n;
        int numero;
        int contador = 0;

        System.out.print("Digite N: ");
        n = teclado.nextInt();

        for (int i = 0; i < n; i++) {

            System.out.print("Digite um numero: ");
            numero = teclado.nextInt();

            if (numero >= 1 && numero <= n) {
                contador++;
            }
        }

        System.out.println("Quantidade de valores entre 1 e " + n + ": " + contador);

        teclado.close();
    }
}