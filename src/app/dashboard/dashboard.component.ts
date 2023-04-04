import { ICalled } from './IChamados';
import { DashboardApiService } from './dashboard-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  erro!: string;

  allCalled!: ICalled[];

  constructor(private dashboardApiService: DashboardApiService) {}

  ngOnInit(): void {
    // this.getAllCalled()
  }

  getAllCalled() {
    this.dashboardApiService.getAllCalledAPI().subscribe((data) => {
      this.allCalled = data;
      console.log(this.allCalled)
    }, (error) => {
      this.erro = error
      console.log("Error: ", error)
    })
  }
}
