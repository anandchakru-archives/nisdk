import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RService } from '../../services/r.service';

@Component({
  selector: 'nlib-r-details-addr-text',
  templateUrl: './r-details-addr-text.component.html',
  styleUrls: ['./r-details-addr-text.component.scss']
})
export class RDetailsAddrTextComponent implements OnInit, AfterViewInit {
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
