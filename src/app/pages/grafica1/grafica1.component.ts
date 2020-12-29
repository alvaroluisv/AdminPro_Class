import { Component, Input } from '@angular/core';
// import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  titulo: string = "Sin titulo";

  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [ [350, 450, 100], ];
  public color1 = [{ backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }];

}
