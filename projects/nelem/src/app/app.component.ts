import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'nelem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() firewebconfig: any;
  @Output() invite = new EventEmitter<any>();
  @Output() login = new EventEmitter<firebase.User>();
  @Output() guest = new EventEmitter<any>();
}
