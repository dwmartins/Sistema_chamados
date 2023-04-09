import { ChartOptions } from 'chart.js';
import { IAmoutCalled, ICalled } from './IChamados';
import { DashboardApiService } from './dashboard-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  erro!: string;

  allCalled: ICalled[] = [];
  amountCalled: IAmoutCalled[] = [];

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [ [ 'Pendentes' ], [ 'Execução' ], ['Finalizado'] ];
  public pieChartDatasets = [ {
    data: [2, 1, 1],
    backgroundColor: [
      'rgb(247, 57, 57)',
      'rgb(62, 149, 230)',
      'rgb(20, 212, 61)'
    ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dashboardApiService: DashboardApiService) {}

  ngOnInit(): void {
    this.getAllCalled()
    this.getAmountCalled()
    

    setTimeout(() => {
      console.log(this.allCalled)
      console.log(this.amountCalled)
    },2000)
  }

  getAllCalled() {
    this.dashboardApiService.getAllCalledAPI().subscribe((data) => {
      this.allCalled = data;
    }, (error) => {
      this.erro = error
      console.log("Error: ", error)
    })
  }

  getAmountCalled() {
    this.dashboardApiService.getAmountCalledAPI().subscribe((data) => {
      this.amountCalled = data;
    }, (error) => {
      this.erro = error;
      console.log("EROR: ", error);
    })
  }

  
  
}
