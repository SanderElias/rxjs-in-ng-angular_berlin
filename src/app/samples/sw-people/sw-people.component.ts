import { Component } from '@angular/core';
import { SwPeopleService } from '../../samples/sw-people-expand.service';

@Component({
    selector: 'app-sw-people',
    templateUrl: './sw-people.component.html',
    styles: []
})
export class SwPeopleComponent {
    constructor(public sw: SwPeopleService) {}
}
