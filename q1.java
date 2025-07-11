import java.util.*;
public class q1{
  public static void main(String... args){
    Scanner sc = new Scanner(System.in);
    int k = sc.nextInt();
    sc.nextLine();

    List<Integer> list = new ArrayList<>();
    
    for(int i=0;i<k;i++){
      String[] ar = sc.nextLine().split(" ");
      for(String s : ar) list.add(Integer.parseInt(s));
    }

    Collections.sort(list);
    System.out.println(list);
  }
}