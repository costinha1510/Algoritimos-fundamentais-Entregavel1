import java.util.Scanner;

public class Fibonacci {
    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        int n;
        int a = 0;
        int b = 1;
        int proximo;

        System.out.print("Digite a quantidade de termos: ");
        n = teclado.nextInt();

        for (int i = 0; i < n; i++) {
            System.out.print(a + " ");

            proximo = a + b;
            a = b;
            b = proximo;
        }

        teclado.close();
    }
}