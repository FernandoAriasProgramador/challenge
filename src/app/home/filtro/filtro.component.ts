import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../home.service';
import { AppService } from 'src/app/app.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home-filtro',
  templateUrl: './filtro.component.html',
})
export class FiltroComponent implements OnInit {

  price = false;
  sold_quantity = false;
  asc = false;
  ascTexto = 'Ascendente';

  condicion = '';

  min = 0.0;
  max = 0.0;

  @Output() parametros = new EventEmitter<any>(true);
  @Output() orden = new EventEmitter<any>(true);
  @Output() cond = new EventEmitter<any>(true);
  @Output() monto = new EventEmitter<any>(true);

  subscription: Subscription;

  constructor(private service: HomeService,
              private appService: AppService) {
  }

  ngOnInit() {
    this.subscription = this.appService.parametroObservable.subscribe((item: string) => {
      this.reiniciar();
    });
  }



  ascMetodo() {
    this.asc = !this.asc;
    this.ascTexto = this.ascTexto === 'Decendente' ? 'Ascendente' : 'Decendente';
    this.orden.emit(this.asc);
  }
  emitir() {
    let cadena = this.price !== false ? 'price' : '';
    cadena = cadena !== '' && this.sold_quantity !== false ? cadena + ', ' : cadena;
    cadena = this.sold_quantity !== false ? cadena + 'sold_quantity' : cadena;
    this.parametros.emit(cadena);
  }
  emitCond() {
    this.cond.emit(this.condicion);
  }
  montos() {
    const monto = {
      min: this.min,
      max: this.max
    };
    this.monto.emit(monto);
  }
  reiniciar() {
    this.price = false;
    this.sold_quantity = false;
    this.asc = false;
    this.ascTexto = 'Ascendente';

    this.condicion = '';

    this.min = 0.0;
    this.max = 0.0;
  }

}
