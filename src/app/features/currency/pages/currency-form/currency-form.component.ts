import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../../utility/generic-components/base-form.component";
import {Currency} from "../../data-models/currency.model";
import {CurrencyService} from "../../services/currency.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent extends BaseFormComponent<Currency> implements OnDestroy, OnInit{

  constructor( public service: CurrencyService,
               protected formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) data: Currency,
               protected override dialogRef: MatDialogRef<CurrencyFormComponent>
               ) {
    super(service);
    this.item = data;
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      name: ['', [Validators.required]],
      symbol: ['', [Validators.required]],
      exchangeRate: ['', [Validators.required]]
    });
  }

  patchFormValue(): void {
    this.form.patchValue(this.item);
  }


  onCancel() {
    this.cancel();
  }

  onSubmit() {
    this.submit();
  }
}
