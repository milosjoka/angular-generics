import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {BaseIndexComponent} from "../../../../utility/generic-components/base-index.component";
import {Currency} from "../../data-models/currency.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CurrencyFormComponent} from "../currency-form/currency-form.component";

@Component({
  selector: 'app-currency-index',
  templateUrl: './currency-index.component.html',
  styleUrls: ['./currency-index.component.scss']
})
export class CurrencyIndexComponent extends BaseIndexComponent<Currency> implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'symbol', 'exchangeRate', 'cta'];

  constructor( public service: CurrencyService, private dialog: MatDialog) {
    super(service);
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onAddNew(): void {
    throw new Error('Method not implemented.');
  }

  onShow(item: Currency): void {
    console.log('Selected item: ', item);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = item;

    const dialogRef = this.dialog.open(CurrencyFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('Is action executed: ', data)
    )
  }
}
