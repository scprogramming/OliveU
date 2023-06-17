import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import {languages, highlight} from 'prismjs';

@Component({
  selector: 'prism, [prism]',
  template: '<ng-content></ng-content>',
  styles: [ 
  ]
})
export class PrismComponent implements AfterViewInit {
  @Input() code: string;
  @Input() language = 'javascript';  constructor(private el: ElementRef) {}  ngAfterViewInit() {
    const code = (this.code || this.el.nativeElement.innerText)
    const grammar = languages[this.language];
    const html = highlight(code, grammar, this.language);
    this.el.nativeElement.innerHTML = html;
  }
}