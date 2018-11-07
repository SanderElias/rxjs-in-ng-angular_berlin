import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Quote } from './quote.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'quote',
  templateUrl: './quote.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {
  @HostBinding('class.z2') shadow = true;

  @Input() quote: Quote;
}
