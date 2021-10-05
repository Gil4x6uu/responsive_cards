import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() totalNumOfPages: number;
  @Output() onActivePageChange = new EventEmitter<number>();
  @Input() currentActivePage: number;
  public numOfPagesArray: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.numOfPagesArray = Array(this.totalNumOfPages).fill(0).map((x,i) => i);
  }

  /**
   * Notify the main page on change in current active page
   * @param pageNumber
   */
  public onPageSelected(pageNumber: number): void {
    this.currentActivePage = pageNumber;
    this.onActivePageChange.emit(this.currentActivePage);
  }

  public goToPrevPage(): void {
    if(this.currentActivePage > 1) {
      this.currentActivePage--;
      this.onActivePageChange.emit(this.currentActivePage);
    }
  }

  public goToNextPage(): void {
    if(this.currentActivePage < this.totalNumOfPages) {
      this.currentActivePage++;
      this.onActivePageChange.emit(this.currentActivePage);
    }

  }
}
