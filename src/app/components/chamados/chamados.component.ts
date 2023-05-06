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

  idCalledDelete!: number;

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

  // Abre modal de exclusão
  openModalDelete(id: number) {
    const modalDelete = (document.querySelector('.modal_delete') as HTMLElement);
    modalDelete.style.display = 'flex';
    this.idCalledDelete = id;
  }

  closeModalDelete() {
    const btn_cancel = (document.querySelector('.modal_delete') as HTMLElement);
    btn_cancel.style.display = 'none';
  }

  deleteCalled() {
    const btn_cancel = (document.querySelector('.modal_delete') as HTMLElement);
    this.deleteCalledService(this.idCalledDelete);
    this.getAllCalled()

    btn_cancel.style.display = 'none';
  }

  deleteCalledService(id: number) {
    this.servicesGlobalService.deleteCalledAPI(id).subscribe((data) => {
      console.log(`Id do chamado deletado: ${id}`)
    },(error) => {
      this.erro = error
      console.log("Error: ", error)
    })
  }
}
