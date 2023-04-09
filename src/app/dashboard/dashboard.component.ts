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
  public pieChartDatasets: any;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dashboardApiService: DashboardApiService) {}

  ngOnInit(): void {
    this.getAllCalled()
    this.getAmountCalled()
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

       this.pieChartDatasets = [ {
        data: [this.amountCalled[0].pendente, this.amountCalled[0].execucao, this.amountCalled[0].finalizado],
        backgroundColor: [
          'rgb(247, 57, 57)',
          'rgb(62, 149, 230)',
          'rgb(20, 212, 61)'
        ]
      } ];
    }, (error) => {
      this.erro = error;
      console.log("EROR: ", error);
    })
  }

  
  
}
