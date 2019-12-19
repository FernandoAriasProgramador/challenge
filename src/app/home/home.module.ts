import { SharedModule } from './../shared/shared.module';
import { FiltroComponent } from './filtro/filtro.component';
import { PublicacionModalService } from './modal/publicacion.modal.service';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { PaginadorComponent } from './paginador/paginador.component';
import { HomeService } from './home.service';
import { PublicacionModalComponent } from './modal/publicacion.modal.component';
import { AppComponent } from '../app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel/carousel-item.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    HomeService,
    PublicacionModalService,
  ],
  declarations: [
    HomeComponent,
    PaginadorComponent,
    PublicacionModalComponent,
    CarouselComponent,
    CarouselItemDirective,
    FiltroComponent
  ],
  entryComponents: [
    PublicacionModalComponent
  ],
  exports: [
  ],
  bootstrap:    [ AppComponent ]
})
export class HomeModule { }
