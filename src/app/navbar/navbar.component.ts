import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.initializationNav();
  }

  // Abre e fecha a navegação lateral
  openMenu() {
    const navegacao = (document.querySelector(".nav") as HTMLElement);
    const header = (document.querySelector("header") as HTMLElement);

    navegacao.classList.toggle('openNav');
    header.classList.toggle('moveHeader');
  }

  initializationNav() {
    const navegacao = (document.querySelector(".nav") as HTMLElement);
    const header = (document.querySelector("header") as HTMLElement);
    const widthWindow = window.screen.width;

    if(widthWindow <= 700) {
      navegacao.classList.toggle('openNav');
      header.classList.toggle('moveHeader');
    }
  }
}
