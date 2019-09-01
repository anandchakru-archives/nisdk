import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nlib-r-details-addr-title',
  templateUrl: './r-details-addr-title.component.html',
  styleUrls: ['./r-details-addr-title.component.scss']
})
export class RDetailsAddrTitleComponent implements OnInit, AfterViewInit {
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
