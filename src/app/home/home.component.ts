import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PublicacionModalComponent } from './modal/publicacion.modal.component';
import { HomeService } from './home.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home-chalenger',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})
export class HomeComponent implements OnInit {

  bsModalRef: BsModalRef;
  cargando = true;
  lista = [];
  listaAux = [];

  asc = false;
  cadena = '';
  condicion = '';
  monto = {};

  subscription: Subscription;

  constructor(private service: HomeService,
              private appService: AppService,
              private modalService: BsModalService,
              private orderPipe: OrderPipe
  ) {
  }
  ngOnInit(): void {
    this.subscription = this.appService.parametroObservable.subscribe((item: string) => {
      this.cargando = true;
    });
  }

  cargarLista(lista: any) {
    this.lista = lista;
    this.listaAux = lista;
    this.cargando = false;
  }
  mostrarModal(id) {
    const initialState = {
      IdPublicacion: id,
    };
    this.bsModalRef = this.modalService.show(PublicacionModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ordenar(cadena: string) {
    this.cargando = true;

    this.cadena = cadena;
    this.lista = this.orderPipe.transform(this.lista, cadena, this.asc);
    this.cargando = false;
  }

  ordenarAsc(asc) {
    if (this.cadena !== '') {
      this.cargando = true;
      this.asc = asc;
      this.lista = this.orderPipe.transform(this.lista, this.cadena, asc);
      this.cargando = false;
    }
  }
  getCondicion(cond) {
    this.cargando = true;
    const list = this.listaAux.filter(function (lis) {
      return lis.condition.toLowerCase().indexOf(cond.toLowerCase()) > -1;
    });
    this.lista = list;
    this.cargando = false;
  }
  getMonto(mont) {
    if (this.monto !== mont) {
      this.cargando = true;
      this.monto = mont;
      const lista = [];
      this.listaAux.forEach((item, index) => {
        if (Number.parseFloat(item.price) >= Number.parseFloat(mont.min)
          && Number.parseFloat(item.price) <= Number.parseFloat(mont.max)) {
          lista.push(item);
        }
      });
      this.lista = lista;
      this.cargando = false;
    }
  }
}
