import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {CurrencyService} from "../../services/currency.service";
import {BaseIndexComponent} from "../../../../utility/generic-components/base-index.component";
import {Currency} from "../../data-models/currency.model";
import {takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-currency-index',
  templateUrl: './currency-index.component.html',
  styleUrls: ['./currency-index.component.scss']
})
export class CurrencyIndexComponent extends BaseIndexComponent<Currency> implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['id', 'name', 'symbol', 'exchangeRate'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( public service: CurrencyService) {
    super(service);
  }

  ngOnInit(): void {
    this.loadData();
  }

  initBreadCrumb(): void {
    throw new Error('Method not implemented.');
  }

  displayColValue(columnName: string, item: Currency): string | number {
    throw new Error('Method not implemented.');
  }

  onAddNew(): void {
    throw new Error('Method not implemented.');
  }

  show(item: Currency): void {
    console.log(item);
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadData()),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  loadData(): void {
    this.pageIndex = this.paginator?.pageIndex ?  this.paginator.pageIndex : 0;
    this.pageSize = this.paginator?.pageSize ? this.paginator.pageSize : 5;
    const searchCriteria = this.getSearchCriteria();
    this.service.findByCriteria(searchCriteria);
  }
}
