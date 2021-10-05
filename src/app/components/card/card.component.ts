import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from "../../models/card-model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
  @Input() card: CardModel;
  constructor() { }

  ngOnInit(): void {
  }
}
