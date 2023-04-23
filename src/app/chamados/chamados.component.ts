import { Component, OnInit } from '@angular/core';
import { ICalled } from './IChamados';
import { ChamadosApiService } from './chamados-api.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent implements OnInit{

  erro!: string;
  allCalled: ICalled[] = [];
  calledId: ICalled[] = [];

  constructor(private chamados: ChamadosApiService) {}

  ngOnInit(): void {
    this.getAllCalled();
  }

  getAllCalled() {
    this.chamados.getAllCalledAPI().subscribe((data) => {
      this.allCalled = data;
      console.log(data)
    }, (error) => {
      this.erro = error
      console.log("Error: ", error)
    })
  }
}
