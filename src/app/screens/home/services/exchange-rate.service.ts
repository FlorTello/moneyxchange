import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrencyCode } from '../models/currency-code.enum';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private readonly baseUrl: string = environment.api;
  private allRate: BehaviorSubject<any>;
  private rates: object;

  constructor(private httpClient: HttpClient) {}

  getExchangeRate(): Observable<any> {
    return this.httpClient.get(this.baseUrl).pipe(
      map(data => {
        this.allRate = new BehaviorSubject(data['rates']);
        this.rates = data['rates'];
        return data;
      })
    );
  }

  getSpecificRate(base: string = CurrencyCode.USD) {
    return this.rates[base];
  }
}
