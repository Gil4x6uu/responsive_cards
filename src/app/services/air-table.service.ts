import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {CardModel} from "../models/card-model";

@Injectable({
  providedIn: 'root'
})
export class AirTableService {

  constructor(private http: HttpClient) {
  }

  public getCardsDataFromServer(url: string): Observable<CardModel[]> {
    return this.http.get<CardModel[]>(url);
  }
}

