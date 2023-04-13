import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { IAmoutCalled, ICalled, INewCalled } from './IChamados';
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
  calledId: ICalled[] = [];

  finishedCalled!: number;
  calledExecuted!: number;
  pendingCalled!: number;

  // Novo chamado
  newCalled: FormGroup;

  // Gráfico
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [ [ 'Pendentes' ], [ 'Execução' ], ['Finalizado'] ];
  public pieChartDatasets: any;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dashboardApiService: DashboardApiService, private fb: FormBuilder) {
    this.newCalled = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

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
      }];

      this.calledExecuted = data[0].execucao;
      this.finishedCalled = data[0].finalizado;
      this.pendingCalled = data[0].pendente;
    }, (error) => {
      this.erro = error;
      console.log("EROR: ", error);
    })
  }

  toViewCalled(id: number) {
  
    this.dashboardApiService.getCalledByidAPI(id).subscribe((data) => {
      this.calledId = data;
    },(error) => {
      this.erro = error;
      console.log("ERRO: ", error)
    })

    const modal = (document.querySelector('.modalEfect') as HTMLElement)
    modal.style.display = 'flex'
  }

  closeViewCalled() {
    const viewCalled  = (document.querySelector('.viewCalled') as HTMLElement);
    const modal = (document.querySelector('.modalEfect') as HTMLElement)
    viewCalled.style.display = "none";
    modal.style.display = 'none'
  }

  openOptions() {
    const modalOptions = (document.querySelector('.options') as HTMLElement);
    const divCloseOptions = (document.querySelector('.closeOptions') as HTMLElement);
    divCloseOptions.style.display = 'block';
    modalOptions.style.display = 'flex';
  }

  closeOptions() {
    const modalOptions = (document.querySelector('.options') as HTMLElement);
    const divCloseOptions = (document.querySelector('.closeOptions') as HTMLElement);
    divCloseOptions.style.display = 'none';
    modalOptions.style.display = 'none';
  }


  // Modal para abri novo chamado
  openNewCalledModal() {
    const openCalled = (document.querySelector('.openCalled') as HTMLElement);
    openCalled.style.display = 'flex';
  }

  closeOpenNewCalledModal() {
    const openCalled = (document.querySelector('.openCalled') as HTMLElement);
    openCalled.style.display = 'none';
  }

  createNewCalled() {
    const data = this.newCalled.value;

    this.dashboardApiService.newCalledAPI(data.title, data.author, data.description).subscribe((data) => {
      console.log(data)
      this.getAllCalled();
      this.getAmountCalled();
    },(error) => {
      this.erro = error;
      console.log("ERRO: ", error)
    })
  }

}
