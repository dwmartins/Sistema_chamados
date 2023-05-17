import { Component, OnInit } from '@angular/core';
import { ICalled } from './IChamados';
import { ServicesGlobalService } from 'src/app/services/services-global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  idCalledUpdate!: number;

  // Novo chamado
  newCalled: FormGroup;

  // Executa Chamado
  executeCalledForm: FormGroup;

  // alerts
  messageAlert!: string;
  imgAlert!: string;

  constructor(private servicesGlobalService: ServicesGlobalService, private fb: FormBuilder) {
    this.newCalled = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })

    this.executeCalledForm = this.fb.group({
      author: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getAllCalled();
  }

  getAllCalled() {
    this.servicesGlobalService.getAllCalledAPI().subscribe((data) => {
      this.allCalled = data;
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
    btn_cancel.style.display = 'none';
  }
  
  deleteCalledService(id: number) {
    this.servicesGlobalService.deleteCalledAPI(id).subscribe((data) => {
      this.getAllCalled();
    },(error) => {
      this.erro = error
      console.log("Error: ", error)
    })
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

  // Aqui vai criar um novo chamado
  createNewCalled() {
    const calledData = this.newCalled.value;
    const alert = (document.querySelector('.alerts') as HTMLElement);

    this.servicesGlobalService.newCalledAPI(calledData.title, calledData.author, calledData.description).subscribe((data) => {
      this.getAllCalled();

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

  executeCalled() {
    const executeDate = this.executeCalledForm.value;
    const id = this.idCalledUpdate;

    this.servicesGlobalService.executeCalledAPI(id, executeDate.author).subscribe((data) => {
      this.getAllCalled();
      this.closeModalUpdate();
    }, (error) => {
      this.erro = error
      console.log("Error: ", error)
    })
  }

  getIdCalledUpdate(id: number) {
    this.idCalledUpdate = id;

    const openModal = (document.querySelector('.executeCalled') as HTMLElement);
    openModal.style.display = 'flex';
  }

  closeModalUpdate() {
    const openModal = (document.querySelector('.executeCalled') as HTMLElement);
    openModal.style.display = 'none';
  }
}
