import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  @Input() titulo: string = 'Sin titulo';

    // Doughnut
    @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
    // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    @Input('data') public doughnutChartData: MultiDataSet = [
      [350, 450, 100],
    ];
  
    @Input('colors') colors: Color[] = [
      { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
    ];
    // public colors: Color[] = [
    //   { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
    // ];
  
    // public doughnutChartType: ChartType = 'doughnut';
  
  
    // events
    // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //   console.log(event, active);
    // }
  
    // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //   console.log(event, active);
    // }

}
