import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ClogService } from 'projects/nlib/src/public-api';

@Component({
  selector: 'ntest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fireconf = environment.firebase;
  invite: any;
  guest: any;
  constructor(private clog: ClogService) { }
  loadInviteData(invite: any) {
    this.invite = invite;
    this.clog.log('invite: ' + (invite ? invite.hostName : invite));
  }
  loadUserData(user: any) {
    this.clog.log('user: ' + (user ? user.email : user));
  }
  loadGuestData(guest: any) {
    this.guest = guest;
    this.clog.log('guest: ' + (guest ? guest.email : guest));
  }
}
