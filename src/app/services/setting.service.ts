import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private linkTheme = document.querySelector('#theme');

  public links:  NodeListOf<Element>;

  constructor() { 

    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';

    this.linkTheme.setAttribute('href', url);

    localStorage.setItem('theme', url);
  }

  changeTheme(theme: string) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    this.links = document.querySelectorAll('.selector');
  
    this.links.forEach( item => {

      item.classList.remove('working');
      const btnTheme = item.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if( btnThemeUrl === currentTheme ){

        item.classList.add('working');
      }
    });
  }
}
