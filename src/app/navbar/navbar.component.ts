import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iconTheme = 'fa-regular fa-moon'
  iconOpenMenu = 'fa-solid fa-xmark'

  constructor() {}

  ngOnInit(): void {
    this.initializationNav();
  }

  // Abre e fecha a navegação lateral
  openMenu() {
    const navegacao = (document.querySelector(".nav") as HTMLElement);
    const header = (document.querySelector("header") as HTMLElement);
    const routes = (document.querySelector("#routes") as HTMLElement);

    routes.classList.toggle('openMenu');
    navegacao.classList.toggle('openNav');
    header.classList.toggle('moveHeader');

    if(this.iconOpenMenu === 'fa-solid fa-bars') {
      this.iconOpenMenu = 'fa-solid fa-xmark';
    } else {
      this.iconOpenMenu = 'fa-solid fa-bars';
    }
  }

  initializationNav() {
    const navegacao = (document.querySelector(".nav") as HTMLElement);
    const header = (document.querySelector("header") as HTMLElement);
    const routes = (document.querySelector("#routes") as HTMLElement);
    const widthWindow = window.screen.width;

    if(widthWindow <= 700) {
      navegacao.classList.toggle('openNav');
      header.classList.toggle('moveHeader');
      routes.classList.toggle('openMenu');
      this.iconOpenMenu = 'fa-solid fa-bars'
    } else {
      this.iconOpenMenu = 'fa-solid fa-xmark'
    }

  }
}
