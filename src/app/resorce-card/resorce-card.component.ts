import { Component, Input } from '@angular/core';
import { Resource } from '../models';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-resorce-card',
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './resorce-card.component.html',
  styleUrl: './resorce-card.component.less'
})
export class ResorceCardComponent {
  @Input() resourceProp: Resource;

  constructor() {
    this.resourceProp = {
      id: 0,
      color: "#333",
      name: "***",
      pantone_value: "00-0000",
      year: 1970,
    }
  }
}
