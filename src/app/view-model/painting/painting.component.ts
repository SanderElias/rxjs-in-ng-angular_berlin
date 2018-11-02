import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'painting',
  templateUrl: './painting.component.html',
  styles: []
})
export class PaintingComponent {
  url: SafeStyle;
  @Input()
  set art(l: string) {
    if (l) {
      this.url = this.san.bypassSecurityTrustStyle(l);
    }
  }

  constructor(private san: DomSanitizer) {}
}
