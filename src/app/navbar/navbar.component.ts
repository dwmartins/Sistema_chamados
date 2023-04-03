import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iconTheme = 'fa-regular fa-moon'
  iconOpenMenu = 'fa-solid fa-bars'

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

    if(this.iconOpenMenu == 'fa-solid fa-xmark') {
      this.iconOpenMenu = 'fa-solid fa-bars';
    } else {
      this.iconOpenMenu = 'fa-solid fa-xmark';
    }
  }

  initializationNav() {
    const navegacao = (document.querySelector(".nav") as HTMLElement);
    const header = (document.querySelector("header") as HTMLElement);
    const widthWindow = window.screen.width;

    if(widthWindow <= 700) {
      navegacao.classList.toggle('openNav');
      header.classList.toggle('moveHeader');
    }

    this.iconOpenMenu = 'fa-solid fa-bars'
  }

  changetTheme() {
    const body = (document.querySelector("body") as HTMLElement);
    body.classList.toggle("dark-mode");
    
    if(this.iconTheme == 'fa-regular fa-moon') {
      this.iconTheme = 'fa-sharp fa-regular fa-sun';
    } else {
      this.iconTheme = 'fa-regular fa-moon';
    }
  }
}
