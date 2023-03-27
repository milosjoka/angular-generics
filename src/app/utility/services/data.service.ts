import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationResponse} from "../data-models/responses/pagination-response.model";
import {environment} from "../../../environments/environment";
import {ItemResponse} from "../data-models/responses/item-response.model";

export interface IDataService<T> {
  findByCriteria(searchParamCriteria: string): Observable<PaginationResponse<T>>;
  getById(id: number): Observable<ItemResponse<T>>;
  create(model: T): Observable<ItemResponse<T>>;
  update(model: T): Observable<ItemResponse<T>>;
  delete(id: number): Observable<ItemResponse<T>>

}
@Injectable({
  providedIn: 'root'
})

export class DataService<T extends { id: number; }> implements IDataService<T> {

  protected endpoint = '';

  constructor(protected http: HttpClient) {
  }

  findByCriteria(searchParamCriteria: string): Observable<PaginationResponse<T>> {
    return this.http.post<PaginationResponse<T>>(`${environment.apiUrl}${this.endpoint}/find`,
      {
        searchCriteria: searchParamCriteria
      }
    );
  }

  getById(id: number): Observable<ItemResponse<T>> {
    return this.http.get<ItemResponse<T>>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
  create(model: T): Observable<ItemResponse<T>> {
    return this.http.post<ItemResponse<T>>(`${environment.apiUrl}${this.endpoint}`, model);
  }

  update(model: T): Observable<ItemResponse<T>> {
    return this.http.put<ItemResponse<T>>(`${environment.apiUrl}${this.endpoint}/${model.id}`, model);
  }

  delete(id: number): Observable<ItemResponse<T>> {
    return this.http.delete<ItemResponse<T>>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}
