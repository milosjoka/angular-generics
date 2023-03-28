import {Component, OnDestroy} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {DataService} from "../generic-services/data.service";

export interface SearchCriteria {
  pageIndex: number;
  pageSize: number;
  sortField: string;
  sortOrder: number;
  filter: string;
}

@Component({
  template: ''
})
export abstract class BaseIndexComponent<T extends { id: number; }> implements OnDestroy {
  protected destroy$: Subject<boolean> = new Subject<boolean>();
  protected clearFilterInput$: Subject<string> = new Subject<string>();
  protected pageIndex: number = 0;
  protected pageSize: number = 5;
  protected sortField: string = 'id';
  protected sortOrder: number = 1;
  protected selectedFilter: string = '';

  protected messageSuccessfullySaved: string = 'Data successfully saved!';
  protected messageSuccessfullyDeleted: string = 'Data successfully deleted!';
  protected messageError: string = 'Something went wrong!';
  protected messageDeleteNotPerformed: string = 'Delete action is not performed!';
  protected messageDeleteNotPerformedRelatedDataExists: string = 'Delete action is not performed, related data exists!';

  protected constructor( protected dataService: DataService<T>) {
  }

  abstract initBreadCrumb(): void;

  abstract displayColValue(columnName: string, item: T): string | number;

  abstract onAddNew(): void;
  abstract loadData(): void;

  abstract show(item: T): void;

  protected onAddFilter(filter: string) {
    this.selectedFilter = filter;
    this.findByCriteria();
  }

  protected getSearchCriteria(): SearchCriteria {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filter: this.selectedFilter
    };
  }
  protected findByCriteria() {
    const searchCriteria: SearchCriteria = this.getSearchCriteria();
    this.dataService.findByCriteria(searchCriteria);
  }

  protected clearSelectedFilter() {
    this.selectedFilter = '';
    this.findByCriteria();
  }

  protected delete(item: T) {
    this.dataService.delete(item.id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          console.log(this.messageSuccessfullyDeleted);
          this.findByCriteria();
        },
        errorResponse => {
          console.error('Error', errorResponse)
        }
      );
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
