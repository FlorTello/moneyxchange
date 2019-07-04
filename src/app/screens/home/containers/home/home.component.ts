import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrencyCode } from '../../models/currency-code.enum';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  rate: number;
  subscription: Subscription;
  currencyCodeSelected: { input: CurrencyCode; output: CurrencyCode };
  placeholderInput: string;
  placeholderOutput: string;
  numberPattern = new RegExp(/^\d+(\.\d{1,4})?$/g);

  constructor(
    private formBuilder: FormBuilder,
    private exchangeRateService: ExchangeRateService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.setCurrencyCodes(CurrencyCode.EUR, CurrencyCode.USD);
    this.placeholderInput = this.currencyCodeSelected.input;
    this.placeholderOutput = this.currencyCodeSelected.output;

    this.form = this.formBuilder.group({
      amount: [
        '',
        {
          validator: [
            Validators.required,
            Validators.pattern(this.numberPattern),
          ],
          updateOn: 'blur',
        },
      ],
      output: ['', Validators.required],
    });

    this.subscription = timer(0, 600000)
      .pipe(switchMap(() => this.exchangeRateService.getExchangeRate()))
      .subscribe(result => {
        this.rate = this.exchangeRateService.getSpecificRate(
          this.currencyCodeSelected.output
        );
        console.log(result);
      });

    this.form.valueChanges.subscribe(value => {
      const inputValue = value.amount;
      this.validateTransformInputAmout(inputValue);
    });
  }

  validateTransformInputAmout(inputValue) {
    if (!this.numberPattern.test(inputValue)) {
      return;
    }
    const formattedResult = this.currencyTransfor(
      inputValue,
      this.currencyCodeSelected.input,
      'symbol',
      '1.2-4'
    );
    this.form.controls['amount'].patchValue(formattedResult, {
      emitEvent: false,
    });
  }

  setCurrencyCodes(input: CurrencyCode, output: CurrencyCode) {
    this.currencyCodeSelected = { input, output };
  }

  currencyTransfor(
    value: string,
    currencyCode: string,
    symbol: string,
    digitsInfo: string
  ): string {
    if (isNaN(<any>value.charAt(0))) {
      const val = value.slice(1, value.length);
      const calculatedAmout = this.currencyPipe.transform(
        val,
        currencyCode,
        symbol,
        digitsInfo
      );
      return calculatedAmout;
    } else {
      const calculatedAmout = this.currencyPipe.transform(
        value,
        currencyCode,
        symbol,
        digitsInfo
      );
      return calculatedAmout;
    }
  }

  onClick() {
    const inputValue = this.form.controls['amount'].value.slice(1);
    const result = this.calculateExchange(inputValue).toString();
    const formattedResult = this.currencyTransfor(
      result,
      this.currencyCodeSelected.output,
      'symbol',
      '1.2-4'
    );
    this.form.controls['output'].patchValue(formattedResult);
  }

  calculateExchange(valueToCalculate): number {
    return valueToCalculate * this.rate;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
