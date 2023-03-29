import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {debounceTime, distinctUntilChanged, fromEvent, Subject, takeUntil, tap} from "rxjs";
import {DataService} from "../generic-services/data.service";
import {MatPaginator} from "@angular/material/paginator";

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
export abstract class BaseIndexComponent<T extends { id: number; }> implements OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef;

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

  protected constructor(
    protected dataService: DataService<T>
  ) {
  }

  abstract onAddNew(): void;
  onLoadData(): void {
    this.pageIndex = this.paginator?.pageIndex ?  this.paginator.pageIndex : 0;
    this.pageSize = this.paginator?.pageSize ? this.paginator.pageSize : 5;
    const searchCriteria = this.getSearchCriteria();
    this.dataService.findByCriteria(searchCriteria);
  };

  abstract onShow(item: T): void;
  onClearFilter(): void {
    this.searchInput.nativeElement.value = '';
    this.selectedFilter = '';
    this.paginator.pageIndex = 0;
    this.onLoadData();
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
  protected onFindByCriteria() {
    const searchCriteria: SearchCriteria = this.getSearchCriteria();
    this.dataService.findByCriteria(searchCriteria);
  }

  protected onDelete(item: T) {
    this.dataService.delete(item.id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          console.log(this.messageSuccessfullyDeleted);
          this.onFindByCriteria();
        },
        errorResponse => {
          console.error('Error', errorResponse)
        }
      );
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement,'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.selectedFilter = this.searchInput.nativeElement.value;
          this.onLoadData();
        })
      )
      .subscribe();

    this.paginator.page.pipe(
      tap(() => this.onLoadData()),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
