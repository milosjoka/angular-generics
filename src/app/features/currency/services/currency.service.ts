import { Injectable } from '@angular/core';
import {DataService, IDataService} from "../../../utility/services/data.service";
import {CurrencyModel} from "../data-models/currency.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends DataService<CurrencyModel> implements IDataService<CurrencyModel> {

  override endpoint = 'currencies';
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  listAll(): Observable<CurrencyModel[]> {
    return this.http.get<CurrencyModel[]>(`${environment.apiUrl}${this.endpoint}/list-all`);
  }
}