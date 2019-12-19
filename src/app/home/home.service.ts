import { Injectable } from '@angular/core';
import { AppService } from './../app.service';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import Swal from 'sweetalert2';

@Injectable()
export class HomeService {
  default = '&limit=20&offset=';
  constructor(private api: AppService, private http: HttpClient) { }

  Lista() {
    return this.http.get(this.api.Url + 'sites/MLA/search?q=notebook' + this.default)
      .map((res: any) => res)
      // tslint:disable-next-line: deprecation
      .catch((e: any) => Observable.throw(this.getError(e)));
  }
  ListaConParametro(parametro: string, pagina: number) {
    return this.http.get(this.api.Url + 'sites/MLA/search?q=' + parametro + this.default + pagina)
      .map((res: any) => res)
      // tslint:disable-next-line: deprecation
      .catch((e: any) => Observable.throw(this.getError(e)));
  }
  ListaConParametroTodos(parametro: string) {
    return this.http.get(this.api.Url + 'sites/MLA/search?q=' + parametro + '&offset=1000')
      .map((res: any) => res)
      // tslint:disable-next-line: deprecation
      .catch((e: any) => Observable.throw(this.getError(e)));
  }
  getError(error: any): void {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error'
    });
  }
}
