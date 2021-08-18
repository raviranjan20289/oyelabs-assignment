#include<iostream>
using namespace std;
int main(){
  int n;cin>>n;
  int a[n-1],arrSum =0;
  for(int i=0;i<n-1;i++) cin>>a[i],arrSum+=a[i];
  int totalSum = (n*(n+1))/2;
cout << "Missing No is-" << totalSum - arrSum << endl;	
}

