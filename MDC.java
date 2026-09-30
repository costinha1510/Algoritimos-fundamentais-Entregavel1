import java.util.Scanner;

public class MDC {
    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        int a, b, resto;

        System.out.print("Digite o primeiro numero: ");
        a = teclado.nextInt();

        System.out.print("Digite o segundo numero: ");
        b = teclado.nextInt();

        a = Math.abs(a);
        b = Math.abs(b);

        while (b != 0) {
            resto = a % b;
            a = b;
            b = resto;
        }

        System.out.println("O MDC e: " + a);

        teclado.close();
    }
}
