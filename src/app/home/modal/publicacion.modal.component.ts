import { PublicacionModalService } from './publicacion.modal.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal-publicacion',
  templateUrl: './publicacion.modal.component.html',
})
export class PublicacionModalComponent implements OnInit {

  IdPublicacion = '';
  item: any = {};

  constructor(private ref: BsModalRef,
    private service: PublicacionModalService
  ) { }

  ngOnInit(): void {
    console.log(this.IdPublicacion);
    this.service.getPublicacion(this.IdPublicacion).subscribe(s => {
      this.item = s;
      console.log(this.item);

    });
  }
  close() {
    this.ref.hide();
  }

}
