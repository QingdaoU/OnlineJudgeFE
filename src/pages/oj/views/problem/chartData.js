const pieColorMap = {
  'AC': {color: '#19be6b'},
  'WA': {color: '#ed3f14'},
  'TLE': {color: '#ff9300'},
  'MLE': {color: '#f7de00'},
  'RE': {color: '#ff6104'},
  'CE': {color: '#80848f'},
  'PAC': {color: '#2d8cf0'}
}

const template = {
  'C': `#include <stdio.h>

int main() {
  int input1;
  int input2;
  scanf("%d %d",&input1,&input2);
  printf("%d",input1 + input2);
  return 0;
}`,
  'C++': `#include <iostream>
using namespace std;

int main() {
  int input1, input2;
  std::cin >> input1 >> input2;
  std::cout << input1 + input2;
  return 0;
}`,
  'Java': `import java.util.Scanner;
  
public class Main {
  public static void main(String[] args){
    Scanner in=new Scanner(System.in);
    int input1 = in.nextInt();
    int input2 = in.nextInt();
    System.out.println(input1 + input2);
    return ;
  }
}`,
  'Golang': `package main
import "fmt"

func main() {
   var input1, input2 int
   fmt.Scan(&input1)
   fmt.Scan(&input2)
   fmt.Println(input1 + input2)
}`,
  'Python2': `input1, input2 = map(int, raw_input().split())
print input1 + input2`,
  'Python3': `input1, input2 = map(int, input().split())
print(input1 + input2)`
}

function getItemColor (obj) {
  return pieColorMap[obj.name].color
}

const pie = {
  legend: {
    left: 'center',
    top: '10',
    orient: 'horizontal',
    data: ['AC', 'WA']
  },
  series: [
    {
      name: 'Summary',
      type: 'pie',
      radius: '80%',
      center: ['50%', '55%'],
      itemStyle: {
        normal: {color: getItemColor}
      },
      data: [
        {value: 0, name: 'WA'},
        {value: 0, name: 'AC'}
      ],
      label: {
        normal: {
          position: 'inner',
          show: true,
          formatter: '{b}: {c}\n {d}%',
          textStyle: {
            fontWeight: 'bold'
          }
        }
      }
    }
  ]
}

const largePie = {
  legend: {
    left: 'center',
    top:
      '10',
    orient:
      'horizontal',
    itemGap:
      20,
    data:
      ['AC', 'RE', 'WA', 'TLE', 'PAC', 'MLE']
  },
  series: [
    {
      name: 'Detail',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '55%'],
      itemStyle: {
        normal: {color: getItemColor}
      },
      data: [
        {value: 0, name: 'RE'},
        {value: 0, name: 'WA'},
        {value: 0, name: 'TLE'},
        {value: 0, name: 'AC'},
        {value: 0, name: 'MLE'},
        {value: 0, name: 'PAC'}
      ],
      label: {
        normal: {
          formatter: '{b}: {c}\n {d}%'
        }
      },
      labelLine: {
        normal: {}
      }
    },
    {
      name: 'Summary',
      type: 'pie',
      radius: '30%',
      center: ['50%', '55%'],
      itemStyle: {
        normal: {color: getItemColor}
      },
      data: [
        {value: '0', name: 'WA'},
        {value: 0, name: 'AC', selected: true}
      ],
      label: {
        normal: {
          position: 'inner',
          formatter: '{b}: {c}\n {d}%'
        }
      }
    }
  ]
}

export { pie, largePie, template }
