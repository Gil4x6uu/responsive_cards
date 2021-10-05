import {Component, HostListener, OnInit} from '@angular/core';
import {AirTableService} from "./services/air-table.service";
import {CardModel} from "./models/card-model";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'tailorBrands-assignment';
  private allCards: CardModel[];
  public currentDisplayedCards: CardModel[];
  public cardsPerPage = 6;
  public totalNumOfPages: number;
  public isMobile: boolean;
  public currentActivePage: number = 1;

  constructor(private airTableService: AirTableService) {
  }

  public ngOnInit(): void {
    const baseUrl = environment.baseUrl;
    this.airTableService.getCardsDataFromServer(baseUrl + '/getAllCards')
      .subscribe((cardsArray: CardModel[]) => {
        this.allCards = cardsArray;
        this.totalNumOfPages = Math.ceil(this.allCards.length / this.cardsPerPage);
        this.calculateIsMobile();
      });
  }

  /**
   * Get called from pagination component when onActivePageChange emits
   * @param pageNumber
   */
  public setCurrentActivePage(pageNumber: number): void {
    if (this.currentActivePage !== pageNumber) {
      this.currentActivePage = pageNumber;
      this.setCurrentPageCards();
    }
  }

  private setCurrentPageCards(): void {
    const startIndex = (this.currentActivePage - 1) * this.cardsPerPage;
    const endIndex = this.currentActivePage * this.cardsPerPage;
    this.currentDisplayedCards = this.allCards.slice(startIndex, endIndex);
  }


  /**
   * Listen to changes in window size
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onScreenResize(event: Event): void {
    this.calculateIsMobile();
  }

  private calculateIsMobile(): void {
    this.isMobile = window.innerWidth < 768;
    this.updateCurrentDisplayedCards();
  }

  private updateCurrentDisplayedCards(): void {
    if (this.isMobile) {
      this.currentDisplayedCards = this.allCards;
    } else {
      this.setCurrentPageCards();
    }
  }
}
