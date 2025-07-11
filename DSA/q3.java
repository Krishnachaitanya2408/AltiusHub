import java.util.*;
public class q3{
  public static void main(String... args){
    Scanner sc = new Scanner(System.in);
    
    int m = sc.nextInt();
    int n = sc.nextInt();
    int[][] grid = new int[m][n];

    for(int i=0;i<m;i++){
      for(int j=0;j<n;j++){
        grid[i][j] = sc.nextInt();
      }
    }

    
  }
}