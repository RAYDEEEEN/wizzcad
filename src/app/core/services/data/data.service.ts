import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { environment } from '@environments/environment';
import { MetaData } from '@shared/interfaces/data.interface';
import { Item } from '@shared/interfaces/item.interface';
import { map, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private readonly http: HttpClient,
    private readonly loginService: LoginService
  ) {}

  public findById(id: string): Observable<Item> {
    const token = this.loginService.token;

    return this.http.get<Item>(`${environment.apiUrl}/${token}?id=${id}`);
  }

  public findAll(
    page = 0,
    limit = 25,
    sort?: Sort,
    search?: string
  ): Observable<MetaData> {
    const token = this.loginService.token;
    let params = new HttpParams().append('_page', page).append('_limit', limit);

    params = search ? params.append('name_like', search) : params;

    params =
      sort && sort.direction
        ? params.append('_sort', sort.active).append('_order', sort.direction)
        : params;

    return this.http
      .get<any>(`${environment.apiUrl}/${token}`, {
        params,
        observe: 'response'
      })
      .pipe(
        map(resp => ({
          totalCount: +resp.headers.get('X-Total-Count'),
          data: resp.body
        }))
      );
  }
}
