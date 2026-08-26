import java.util.Scanner;

public class Somatorio {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        System.out.print("Informe a quantidade de numeros: ");
        int n = teclado.nextInt();
        int soma = 0;

        for (int i = 0; i < n; i++) {
            System.out.print("Digite um numero: ");
            soma += teclado.nextInt();
        }

        System.out.printf("Somatorio = %d%n", soma);
        teclado.close();
    }
}
