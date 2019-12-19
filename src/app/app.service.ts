import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  private env = environment;
  Url = this.env.urlBase;

  private parametro = 'notebook';
  private parametroSubjet = new Subject<string>();
  public parametroObservable = this.parametroSubjet.asObservable();

  emitirParametro(item: string) {
    this.parametroSubjet.next(item);
  }
}
