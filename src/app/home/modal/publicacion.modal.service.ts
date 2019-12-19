import { AppService } from './../../app.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PublicacionModalService {

  constructor(
    private api: AppService,
    private http: HttpClient) { }

  getPublicacion(id: string) {
    return this.http.get(this.api.Url + 'items/' + id)
      .map((res: any) => res);
  }
}
