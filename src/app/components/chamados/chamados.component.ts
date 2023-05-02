import { Component, OnInit } from '@angular/core';
import { ICalled } from './IChamados';
import { ServicesGlobalService } from 'src/app/services/services-global.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent implements OnInit{

  erro!: string;
  allCalled: ICalled[] = [];
  calledId: ICalled[] = [];

  constructor(private servicesGlobalService: ServicesGlobalService) {}

  ngOnInit(): void {
    this.getAllCalled();
  }

  getAllCalled() {
    this.servicesGlobalService.getAllCalledAPI().subscribe((data) => {
      this.allCalled = data;
      console.log(data)
    }, (error) => {
      this.erro = error
      console.log("Error: ", error)
    })
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
}
