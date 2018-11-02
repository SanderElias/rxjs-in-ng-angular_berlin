import { Component, OnInit } from '@angular/core';
import { RakiService } from 'src/app/rijks/raki.service';
import { tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-home',
  templateUrl: './vm-home.component.html'
})
export class VmHomeComponent implements OnInit {
  art$ = this.raki.randomImage$.pipe(tap(url => console.log('art url', url)));

  constructor(private raki: RakiService) {}

  ngOnInit() {}
}
