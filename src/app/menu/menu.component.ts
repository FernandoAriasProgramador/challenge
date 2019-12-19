import { AppService } from './../app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'menu-root',
  templateUrl: './menu.component.html',
  // styleUrls: ['./app.component.css']
})
export class MenuComponent {
  title = 'chalenger';
  navbarOpen = false;

  busqueda = '';

  constructor(private appService: AppService) {}
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  buscar() {
    console.log(this.busqueda);

    this.appService.emitirParametro(this.busqueda);
  }
}
