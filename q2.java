import java.util.*;
public class q2{
  public static void main(String... args){
    Scanner sc = new Scanner(System.in);
    String[] s = sc.nextLine().split(" ");
    int l = s.length;

    int ar[] = new int[l];

    for(int i=0;i<l;i++) ar[i] = Integer.parseInt(s[i]);

    int k = sc.nextInt();

    List<Integer> temp = new ArrayList<>();
    for(int i=0;i<k;i++) temp.add(ar[i]);

    int i=0;
    while(i+k<=l){
      if(i>0){
        int ind = temp.indexOf(ar[i-1]);
        temp.remove(ind);
        temp.add(ar[i+k-1]);
      }
      Collections.sort(temp);
      System.out.print(temp.get(temp.size()/2) + " ");
      i++;
    }

  }
}