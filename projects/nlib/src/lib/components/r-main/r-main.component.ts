import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nlib-r-main',
  templateUrl: './r-main.component.html',
  styleUrls: ['./r-main.component.scss']
})
export class RMainComponent implements OnInit, AfterViewInit {
  // Rendering
  @ViewChild('ref', { static: true }) ref: ElementRef;
  ngContent = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngContent = this.ref.nativeElement.childNodes.length > 0;
    }, 1);
  }
}
