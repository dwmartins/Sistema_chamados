import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAmoutCalled, ICalled } from './IChamados';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  allCalledUrl = 'http://localhost:3000/todos-chamados';
  amountCalledUrl = 'http://localhost:3000/quantidade-chamados';
  calledByIdUrl = 'http://localhost:3000/visualizar-chamado/'

  constructor(private httpClient: HttpClient) { }

  getAllCalledAPI() {
    return this.httpClient.get<ICalled[]>(this.allCalledUrl);
  }

  getAmountCalledAPI() {
    return this.httpClient.get<IAmoutCalled[]>(this.amountCalledUrl);
  }

  getCalledByidAPI(id: number){
    return this.httpClient.get<ICalled[]>(`${this.calledByIdUrl}${id}`)
  }
}
