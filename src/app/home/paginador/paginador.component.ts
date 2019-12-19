import { AppService } from './../../app.service';
import { HomeService } from "./../home.service";
import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from "@angular/core";
import { Subscription } from 'rxjs';

@Component({
  selector: "paginador",
  template: `
    <ul *ngIf="pager.pages && pager.pages.length" class="pagination">
      <li
        [ngClass]="{ disabled: pager.currentPage === 1 }"
        class="page-item first-item"
      >
        <a (click)="setPage(1)" class="page-link">First</a>
      </li>
      <li
        [ngClass]="{ disabled: pager.currentPage === 1 }"
        class="page-item previous-item"
      >
        <a (click)="setPage(pager.currentPage - 1)" class="page-link"
          >Ant.</a
        >
      </li>
      <li
        *ngFor="let page of pager.pages"
        [ngClass]="{ active: pager.currentPage === page }"
        class="page-item number-item"
      >
        <a (click)="setPage(page)" class="page-link">{{ page }}</a>
      </li>
      <li
        [ngClass]="{ disabled: pager.currentPage === pager.totalPages }"
        class="page-item next-item"
      >
        <a (click)="setPage(pager.currentPage + 1)" class="page-link">Sig.</a>
      </li>
      <li
        [ngClass]="{ disabled: pager.currentPage === pager.totalPages }"
        class="page-item last-item"
      >
        <a (click)="setPage(pager.totalPages)" class="page-link">Last</a>
      </li>
    </ul>
  `
})
export class PaginadorComponent implements OnInit, OnChanges, OnDestroy {
  @Output() changePage = new EventEmitter<any>(true);
  initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  cantidadRegistros = 0;
  items: Array<any>;
  pager: any = {};
  lista = [];
  parametro = 'notebook';
  subscription: Subscription;

  constructor(private service: HomeService,
              private appService: AppService) {
  }

  ngOnInit() {
    // set page if items array isn't empty
    // if (this.items && this.items.length) {
    this.setPage(this.initialPage);
    // }
    this.subscription = this.appService.parametroObservable.subscribe((item: string) => {
      this.parametro = item;
      this.setPage(this.initialPage);
    });
  }

  ngOnChanges(changes) {
    // reset page if items array has changed
    // if (changes.items.currentValue !== changes.items.previousValue) {
    //   this.setPage(this.initialPage);
    // }
  }

  private setPage(page: number) {
    this.service.ListaConParametro(this.parametro, page).subscribe(s => {
      console.log(s);
      this.lista = s.results;
      this.cantidadRegistros = s.paging.total > 1000 ? 1000 : s.paging.total;

      this.paginate(this.cantidadRegistros, page, this.pageSize, this.maxPages);
      this.changePage.emit(this.lista);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  paginate(totalItems, currentPage, pageSize, maxPages) {
    if (currentPage === void 0) {
      currentPage = 1;
    }
    if (pageSize === void 0) {
      pageSize = 10;
    }
    if (maxPages === void 0) {
      maxPages = 10;
    }
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    let startPage;
    let endPage;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      function(i) {
        return startPage + i;
      }
    );
    // return object with all pager properties required by the view
    const pagina = {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
    this.pager = pagina;
    // return pagina;
  }
}
