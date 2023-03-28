import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import {BehaviorSubject, catchError, finalize, Observable} from "rxjs";
import {PaginationResponse} from "../data-models/responses/pagination-response.model";
import {environment} from "../../../environments/environment";
import {ItemResponse} from "../data-models/responses/item-response.model";
import {SearchCriteria} from "../generic-components/base-index.component";

export interface IDataService<T> extends DataSource<T>{
  findByCriteria(searchCriteria: SearchCriteria): void;
  getById(id: number): Observable<ItemResponse<T>>;
  create(model: T): Observable<ItemResponse<T>>;
  update(model: T): Observable<ItemResponse<T>>;
  delete(id: number): Observable<ItemResponse<T>>

}
@Injectable({
  providedIn: 'root'
})

export class DataService<T extends { id: number; }> implements IDataService<T> {

  private entitiesSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  protected endpoint = '';

  constructor(protected http: HttpClient) {
  }

  findByCriteria(searchCriteria: SearchCriteria): void {
    console.log(`${environment.apiUrl}${this.endpoint}/find`);
    this.loadingSubject.next(true);
    this.http.post<PaginationResponse<T>>(`${environment.apiUrl}${this.endpoint}/find`,
      {
        searchCriteria: searchCriteria
      }
    ).pipe(
      catchError(() => []),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe( entities => this.entitiesSubject.next(entities.data.items));
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

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
    this.loadingSubject.complete();
  }
}
