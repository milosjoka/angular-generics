import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";
import {DataService} from "../generic-services/data.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  template: ''
})
export abstract class BaseFormComponent<T extends { id: number; }> implements OnInit, OnDestroy {
  protected destroy$: Subject<boolean> = new Subject<boolean>();
  public item!: T;
  public form!: FormGroup;

  protected dialogRef!: MatDialogRef<any>

  protected constructor(protected dataService: DataService<T>) {
  }

  ngOnInit() {
    this.initForm();
    this.patchFormValue();
  }

  abstract initForm(): void;

  abstract patchFormValue(): void;

  public submit() {
    const item: T = this.form.getRawValue();
    if (this.isUpdateAction(item)) {
      this.update(item);
    } else {
      this.create(item);
    }
  }

  protected isUpdateAction(item: T): boolean {
    return !!(item && item.id);
  }

  protected update(item: T) {
    this.dataService.update(item)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
          console.log('Item updated!');
          this.dialogRef.close(true);
        },
        errorResponse => {
          console.error('Error', errorResponse)
          this.dialogRef.close(false);
        }
      );
  }

  protected create(item: T) {
    this.dataService.create(item)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          console.log('Item created!');
          this.dialogRef.close(true);
        },
        errorResponse => {
          console.error('Error', errorResponse)
          this.dialogRef.close(false);
        });
  }

  public cancel() {
    console.log('Action canceled!');
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
