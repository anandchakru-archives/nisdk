import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RService } from '../../services/r.service';

@Component({
  selector: 'nlib-r-main-title',
  templateUrl: './r-main-title.component.html',
  styleUrls: ['./r-main-title.component.scss']
})
export class RMainTitleComponent implements OnInit, AfterViewInit {
  // Rendering
  @ViewChild('ref', { static: true }) ref: ElementRef;
  ngContent = false;

  constructor(public r: RService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngContent = this.ref.nativeElement.childNodes.length > 0;
    }, 1);
  }
}
