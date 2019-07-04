import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumber]',
})
export class NumberDirective {
  numberPattern = new RegExp(/[^\d(\.)?]/g);

  constructor(private el: ElementRef) {}

  get element(): HTMLInputElement {
    return this.el.nativeElement;
  }

  get value(): string {
    return this.element.value;
  }

  set value(newValue: string) {
    this.element.value = newValue;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any): void {
    const clipboardData: any = (<any>window)['clipboardData'];
    if (!(event && event.clipboardData) && !clipboardData) {
      event.preventDefault();
      return;
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any): void {
    if (!event || !event.dataTransfer) {
      event.preventDefault();
      return;
    }

    const pastedValue: string = event.dataTransfer.getData('text');

    if (!pastedValue) {
      event.preventDefault();
      return;
    }

    this.filterNumber(event, pastedValue);
  }

  /**
   * Will prevent entering not integers
   */
  @HostListener('input', ['$event'])
  onInput() {
    if (this.numberPattern.test(this.value)) {
      this.value = this.value.replace(this.numberPattern, '');
    }
  }

  /**
   * Will cancel an input event if the added value will not generate a valid integer.
   * @param event
   * @param addedValue
   */
  private filterNumber(event: Event, addedValue: string): void {
    if (this.numberPattern.test(addedValue)) {
      event.preventDefault();
      return;
    }
    const newValue = `${this.value}${addedValue}`;
    const newNumber = Number(newValue);
    if (
      !this.el.nativeElement.checkValidity() ||
      !Number.isInteger(newNumber)
    ) {
      event.preventDefault();
      return;
    }
  }
}
