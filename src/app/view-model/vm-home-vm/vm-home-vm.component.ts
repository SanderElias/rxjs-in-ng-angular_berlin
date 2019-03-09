import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { combineLatest, fromEvent, NEVER, of, Subject, timer } from 'rxjs';
import {
  filter,
  map,
  pluck,
  scan,
  startWith,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { RakiService } from 'src/app/rijks/raki.service';
import { QuoteService, Quote } from '../quote/quote.service';

interface Vm {
  art: string;
  quote: Quote;
  countDown: number;
  baToggle: boolean;
  bqToggle: boolean;
  speed: number;
}
@Component({
  selector: 'vm-home-vm',
  templateUrl: './vm-home-vm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VmHomeVmComponent implements OnInit {
  init$ = new Subject<void>();
  @ViewChild('ba', { read: ElementRef }) set _ba(elm) {
    this.ba = elm;
  }
  ba;

  @ViewChild('bq', { read: ElementRef }) set _bq(elm) {
    this.bq = elm;
  }
  bq;

  @ViewChild('speed', { read: ElementRef }) set _speed(elm) {
    this.speedRef = elm;
  }
  speedRef;
  data: any;

  art$ = this.raki.randomImage$.pipe(filter(Boolean));

  baClicks$ = this.refClickToggle('ba');
  bqClicks$ = this.refClickToggle('bq');
  speed$ = this.refEvent('speedRef', 'change').pipe(
    pluck('target', 'value'),
    map(x => +x),
    startWith(3.5),
    tap(r => console.log('speed', r))
    // shareReplay(1),  // Solution?
  );

  quote$ = this.speed$.pipe(
    switchMap(seconds =>
      this.q.RandomQuoteOnIntervalObs(seconds * 1000).pipe(filter(Boolean))
    )
  );

  pauseQuote$ = this.bqClicks$.pipe(switchMap(b => (b ? NEVER : this.quote$)));

  pausedArt$ = this.baClicks$.pipe(switchMap(b => (b ? NEVER : this.art$)));

  countDown$ = this.pausedArt$.pipe(
    switchMap(() => timer(0, 1000)),
    scan((duration, t) => 20 - t)
  );

  vm$ = combineLatest(
    this.pausedArt$,
    this.pauseQuote$,
    this.countDown$,
    this.baClicks$,
    this.bqClicks$,
    this.speed$
  ).pipe(
    map<any[], Vm>(([art, quote, countDown, baToggle, bqToggle, speed]) => ({
      art,
      quote,
      countDown,
      baToggle,
      bqToggle,
      speed
    })),
    tap(data => (this.data = data))
  );

  constructor(private raki: RakiService, private q: QuoteService) {}

  refClickToggle(name: string) {
    return this.refEvent(name, 'click').pipe(
      scan(acc => !acc, false),
      startWith(false),
      tap(r => console.log(name, r))
    );
  }

  refEvent(name: string, eventName: string) {
    return this.init$.pipe(
      switchMap(() => timer(10, 100)),
      switchMap(() => (this[name] ? of(this[name]) : NEVER)),
      tap(e => console.log('init done, ref:', e)),
      take(1),
      switchMap(() => fromEvent(this[name].nativeElement, eventName)),
      tap(() => console.log(name, eventName))
    );
  }

  ngOnInit() {
    /**
     * Lift the init to the next cycle. That way all the UI elements are in place
     * and available to the refEvent helper
     */
    setTimeout(() => this.init$.next(), 10);
  }
}
