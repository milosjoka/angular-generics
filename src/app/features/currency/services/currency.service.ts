import { Injectable } from '@angular/core';
import {CurrencyModel} from "../data-models/currency.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {DataService, IDataService} from "../../../utility/generic-services/data.service";

export interface ICurrencyService extends IDataService<CurrencyModel> {
  listAll(): Observable<CurrencyModel[]>;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends DataService<CurrencyModel> implements ICurrencyService {

  override endpoint = 'currencies';
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  listAll(): Observable<CurrencyModel[]> {
    return this.http.get<CurrencyModel[]>(`${environment.apiUrl}${this.endpoint}/list-all`);
  }
}
