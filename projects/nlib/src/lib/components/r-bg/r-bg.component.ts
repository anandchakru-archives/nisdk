import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { RService } from '../../services/r.service';
import { UtilService } from '../../services/util.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nlib-r-bg',
  templateUrl: './r-bg.component.html',
  styleUrls: ['./r-bg.component.scss']
})
export class RBgComponent implements OnInit, AfterViewInit, OnDestroy {
  uns = new Subject();
  ngContent = false;
  @ViewChild('ref', { static: true }) ref: ElementRef;
  constructor(public r: RService, private rendrer: Renderer2, private util: UtilService) { }

  ngOnInit() {
    this.util.inviteSub.pipe(takeUntil(this.uns)).subscribe(() => {
      if (!this.ngContent && this.r.bgPhoto && this.r.bgPhoto.url) {
        const hstyle = document.querySelector('html');
        this.rendrer.setStyle(hstyle, 'background-image', `url('${this.r.bgPhoto.url}')`);
        this.rendrer.setStyle(hstyle, 'background-position', `center center`);
        this.rendrer.setStyle(hstyle, 'background-repeat', `no-repeat`);
        this.rendrer.setStyle(hstyle, 'background-attachment', `fixed`);
        this.rendrer.setStyle(hstyle, 'background-size', `cover`);
      }
    });
  }

  ngOnDestroy() {
    this.uns.next();
    this.uns.complete();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.ngContent = this.ref.nativeElement.childNodes.length > 0;
    }, 1);
  }
}
