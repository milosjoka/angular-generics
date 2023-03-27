import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationResponse} from "../data-models/responses/pagination-response.model";
import {environment} from "../../../environments/environment";
import {ItemResponse} from "../data-models/responses/item-response.model";


@Injectable({
  providedIn: 'root'
})

export class DataService<T extends { id: number; }> {

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

  create(model: T): Observable<ItemResponse<T>> {
    return this.http.post<ItemResponse<T>>(`${environment.apiUrl}${this.endpoint}`, model);
  }

  update(model: T): Observable<ItemResponse<T>> {
    return this.http.put<ItemResponse<T>>(`${environment.apiUrl}${this.endpoint}/${model.id}`, model);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}
