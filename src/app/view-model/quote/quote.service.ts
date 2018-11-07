import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map, mergeMap, switchMap } from 'rxjs/operators';
import { interval, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})
export class QuoteService {
  quotes$ = this.http
    .get<Quote[]>('https://talaikis.com/api/quotes/')
    .pipe(shareReplay(1));

  quoteLength$ = this.quotes$.pipe(
    map(list => list.length),
    shareReplay(1)
  );

  quoteObs = (idx: number) => this.quotes$.pipe(map(list => list[idx]));

  RandomQuoteOnIntervalObs = (time: number) =>
    timer(0, time).pipe(
      switchMap(() => this.quoteLength$),
      map(length => Math.floor(Math.random() * length)),
      mergeMap(this.quoteObs)
    );

  constructor(private http: HttpClient) {}
}

/** quotes, as coming from `https://talaikis.com/api/quotes/' */
export interface Quote {
  /** the actual quote */
  quote: string;
  /** the author */
  author: string;
  /** in what category is this quote */
  cat: string;
}
