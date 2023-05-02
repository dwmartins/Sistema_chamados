import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalled } from './IChamados';

@Injectable({
  providedIn: 'root'
})
export class ChamadosApiService {

  allCalledUrl = 'http://localhost:3000/todos-chamados';

  constructor(private httpClient: HttpClient) { }

  getAllCalledAPI() {
    return this.httpClient.get<ICalled[]>(this.allCalledUrl);
  }
}
