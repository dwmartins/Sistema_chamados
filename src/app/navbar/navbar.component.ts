import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor() {}

  openMenu() {
    const navegacao = (document.querySelector(".nav") as HTMLElement);
    const header = (document.querySelector("header") as HTMLElement);

    navegacao.classList.toggle('openNav');
    header.classList.toggle('moveHeader');
  }

}
