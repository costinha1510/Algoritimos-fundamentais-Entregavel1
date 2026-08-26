import java.util.Scanner;

public class Primo {

    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        System.out.print("Digite um número: ");
        int numero = teclado.nextInt();

        boolean primo = true;

        if (numero < 2) {
            primo = false;
        } else {

            for (int i = 2; i < numero; i++) {

                if (numero % i == 0) {
                    primo = false;
                    break;
                }
            }
        }

        if (primo) {
            System.out.println("Número Primo!!");
        } else {
            System.out.println("Não é Primo!!");
        }

        teclado.close();
    }
}
