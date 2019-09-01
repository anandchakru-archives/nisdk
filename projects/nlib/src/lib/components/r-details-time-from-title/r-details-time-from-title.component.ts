import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nlib-r-details-time-from-title',
  templateUrl: './r-details-time-from-title.component.html',
  styleUrls: ['./r-details-time-from-title.component.scss']
})
export class RDetailsTimeFromTitleComponent implements OnInit, AfterViewInit {
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
