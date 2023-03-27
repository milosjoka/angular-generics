import {OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {IDataService} from "../services/data.service";

export interface SearchCriteria {
  offset: number;
  rows: number;
  sortField: string;
  sortOrder: number;
  filter: string;
}

export abstract class BaseIndexComponent<T extends { id: number; }> implements OnInit, OnDestroy {
  protected destroy$: Subject<boolean> = new Subject<boolean>();
  protected clearFilterInput$: Subject<string> = new Subject<string>();

  protected items: T[] = [];
  protected totalRecords: number = 0;
  private isLoading: boolean = false;
  protected offset: number = 0;
  private rowsPerPage: number = 10;
  protected sortField: string = 'id';
  protected sortOrder: number = 1;
  private selectedFilter: string = '';

  protected messageSuccessfullySaved: string = 'Data successfully saved!';
  protected messageSuccessfullyDeleted: string = 'Data successfully deleted!';
  protected messageError: string = 'Something went wrong!';
  protected messageDeleteNotPerformed: string = 'Delete action is not performed!';
  protected messageDeleteNotPerformedRelatedDataExists: string = 'Delete action is not performed, related data exists!';

  protected constructor( protected dataService: IDataService<T>) {
  }

  ngOnInit() {
  }


  abstract initBreadCrumb(): void;

  abstract displayColValue(columnName: string, item: T): string | number;

  abstract onAddNew(): void;

  abstract show(item: T): void;

  protected onAddFilter(filter: string) {
    this.selectedFilter = filter;
    this.findByCriteria(false);
  }

  public getPageData(event: any): void {
    this.updatePaginationParameters(event);
    this.findByCriteria(true);
  }

  protected getSearchCriteria(isPagination: boolean): SearchCriteria {
    return {
      offset: isPagination ? this.offset : 0,
      rows: this.rowsPerPage,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filter: this.selectedFilter
    };
  }

  protected updatePaginationParameters(event: any) {
    this.offset = event.first;
    this.rowsPerPage = event.rowsPerPage;
    this.sortField = event.sortField;
    this.sortOrder = event.sortOrder;
  }

  protected findByCriteria(isPagination: boolean =  false) {
    this.isLoading = true;
    const searchCriteria: SearchCriteria = this.getSearchCriteria(isPagination);
    this.dataService.findByCriteria(searchCriteria)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response) => {
          this.items = response.data.items;
          this.totalRecords = response.data.resourceTotalCount;
          this.isLoading = false;
        }
      );
  }

  protected clearSelectedFilter(field: string) {
    this.selectedFilter = '';
    this.findByCriteria(false);
  }

  protected delete(item: T) {
    this.dataService.delete(item.id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          console.log(this.messageSuccessfullyDeleted);
          this.isLoading = true;
          this.findByCriteria(false);
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
