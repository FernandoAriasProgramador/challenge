import { Component, OnInit,  ViewChild, Input} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'carousel',
  template: `
    <ngb-carousel #myCarousel="ngbCarousel" >
      <ng-template ngbSlide *ngFor="let item of data; let i = index" id="{{i}}">
        <img [src]="item.url" class="img-fluid" alt="">
      </ng-template>
    </ngb-carousel>
  `,
  styles: [`
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 6000px;
    }
    .carousel-wrapper {
      overflow: hidden;
    }
    .carousel-inner {
      display: flex;
    }
    .img-fluid {
      max-width: none;
      max-height: 200px;
    }

  `]
})
export class CarouselComponent implements OnInit {
    @Input() data: any;
    @ViewChild('myCarousel', {static: true}) myCarousel: NgbCarousel;
    constructor(private config: NgbCarouselConfig) {
      this.config.interval = 1000;
      this.config.wrap = true;
      this.config.keyboard = true;
    }
    ngOnInit() {
      this.myCarousel.activeId = '0';  // <-- use this, begans 0
    }
  }
