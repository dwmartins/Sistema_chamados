import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { IAmoutCalled, ICalled, INewCalled } from './IChamados';
import { DashboardApiService } from './dashboard-api.service';
import { Component, OnInit } from '@angular/core';
import { ServicesGlobalService } from 'src/app/services/services-global.service';

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

  // alerts
  messageAlert!: string;
  imgAlert!: string;

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

  constructor(private servicesGlobalService: ServicesGlobalService, private fb: FormBuilder) {
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

  // Aqui vai pegar Todos os chamados
  getAllCalled() {
    this.servicesGlobalService.getAllCalledAPI().subscribe((data) => {
      this.allCalled = data;
    }, (error) => {
      this.erro = error
      console.log("Error: ", error)
    })
  }

  // Aqui vai pegar as quantidade e colocar no gráfico
  getAmountCalled() {
    this.servicesGlobalService.getAmountCalledAPI().subscribe((data) => {
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

  // Aqui vai abrir um modal com as informações do chamado pegando pelo id
  toViewCalled(id: number) {
  
    this.servicesGlobalService.getCalledByidAPI(id).subscribe((data) => {
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

  //Aqui vai abrir o botão de opções(novo chamado, executar chamado)
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

  // Modal para abrir novo chamado
  openNewCalledModal() {
    const openCalled = (document.querySelector('.openCalled') as HTMLElement);
    openCalled.style.display = 'flex';
  }

  closeOpenNewCalledModal() {
    const openCalled = (document.querySelector('.openCalled') as HTMLElement);
    openCalled.style.display = 'none';
  }

  openAlert(msg: string, img: string) {
    const alert = (document.querySelector('.alerts') as HTMLElement);

    this.messageAlert = msg;
    this.imgAlert = img;

    alert.style.display = 'flex';
  }

  closeAlert() {
    const alert = (document.querySelector('.alerts') as HTMLElement);
    alert.style.display = 'none';
  }

  // Aqui vai criar um novo chamado
  createNewCalled() {
    const calledData = this.newCalled.value;
    const alert = (document.querySelector('.alerts') as HTMLElement);

    this.servicesGlobalService.newCalledAPI(calledData.title, calledData.author, calledData.description).subscribe((data) => {
      this.getAllCalled();
      this.getAmountCalled();

      if(data[0].sucesso) {
        const msg = data[0].sucesso;
        const img = 'sucess.png';
        
        this.openAlert(msg, img)
      }

      if(data[0].aviso) {
        const msg = data[0].aviso;
        const img = 'attention.png';
        
        this.openAlert(msg, img)
      }

    },(error) => {
      this.erro = error;
      console.log("ERRO: ", error)

      const msg = error.error[0].erro;
      const img = 'warning.png';
     
      this.openAlert(msg, img)
    })
  }

}
