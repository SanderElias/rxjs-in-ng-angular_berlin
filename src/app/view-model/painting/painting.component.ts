import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'painting',
  templateUrl: './painting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingComponent {
  @HostBinding('class.z2') shadow = true;

  url: SafeStyle;

  @Input() set art(l: string) {
    if (l) {
      this.url = this.san.bypassSecurityTrustStyle(
        l + ' no-repeat center center'
      );
    }
  }

  constructor(private san: DomSanitizer) {}
}
