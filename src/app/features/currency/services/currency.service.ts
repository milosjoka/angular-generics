import { Injectable } from '@angular/core';
import {Currency} from "../data-models/currency.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {DataService, IDataService} from "../../../utility/generic-services/data.service";

export interface ICurrencyService extends IDataService<Currency> {
  listAll(): Observable<Currency[]>;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends DataService<Currency> implements ICurrencyService {
  override endpoint = '/currencies';
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  listAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${environment.apiUrl}${this.endpoint}/list-all`);
  }
}
