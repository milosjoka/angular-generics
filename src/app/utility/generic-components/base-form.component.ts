import {OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";
import {DataService} from "../generic-services/data.service";

export abstract class BaseFormComponent<T extends { id: number; }> implements OnInit, OnDestroy {
  protected destroy$: Subject<boolean> = new Subject<boolean>();
  public item!: T;
  public form!: FormGroup;

  protected constructor(protected dataService: DataService<T>) {
  }

  ngOnInit() {
    this.initForm();
    this.patchFormValue();
  }

  abstract initForm(): void;

  abstract patchFormValue(): void;

  public onSubmit() {
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
          // this.ref.close(isSaved);
        },
        errorResponse => {
          console.error('Error', errorResponse)
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
          // this.ref.close(isSaved);
        },
        errorResponse => {
          console.error('Error', errorResponse)
        });
  }

  public onCancel() {
    console.log('Action canceled!');
    // this.ref.close(isSaved);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
