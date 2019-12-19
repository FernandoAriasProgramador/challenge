import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  providers: [
  ],
  declarations: [
    LoadingComponent
  ],
  entryComponents: [
  ],
  exports: [
    LoadingComponent
  ]
})
export class SharedModule { }
