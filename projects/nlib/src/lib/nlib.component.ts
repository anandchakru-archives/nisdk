import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, Renderer2, ViewChild, ElementRef, HostListener, NgZone } from '@angular/core';
import { UtilService } from './services/util.service';
import { takeUntil, take, map } from 'rxjs/operators';
import { Subject, interval, timer } from 'rxjs';
import { Invite, Guest, Growl, ModalMsg, Preloading } from './util/nlib-model';
import { Title } from '@angular/platform-browser';
import { ClogService } from './services/clog.service';
import { AtcService } from './services/atc.service';
import { KeyValue } from '@angular/common';
import { BUILDINFO } from './buildinfo';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'nlib-nivite',
  templateUrl: './nlib.component.html',
  styleUrls: ['./nlib.component.scss']
})
export class NlibComponent implements OnInit, OnDestroy {
  preloads: { [key: string]: Preloading } = {};
  private uns = new Subject();
  @Output() invite = new EventEmitter<Invite>();
  @Output() login = new EventEmitter<firebase.User>();
  @Output() guest = new EventEmitter<Guest>();
  @Output() preloading = new EventEmitter<Preloading>();
  //ATC
  @ViewChild('atcModal', { static: false }) atcModal: ElementRef;
  //GROWLS
  growls: { [id: string]: Growl } = {};
  //NAV
  buildinfo = BUILDINFO;
  // RSVP
  @ViewChild('rsvpModal', { static: false }) rsvpModal: ElementRef;
  savingrsvp: boolean;
  fg: FormGroup;
  guestCurrent: Guest;
  constructor(public atc: AtcService, private fb: FormBuilder, public util: UtilService, private title: Title
    , public clog: ClogService, private renderer: Renderer2, private zone: NgZone) {
    // GROWL
    this.util.growlSub.pipe(takeUntil(this.uns)).subscribe((growl: Growl) => {
      const gid = this.rnd();
      if (growl.autoclose) {
        const startTime = new Date();
        const countr = timer(0, 500).pipe(takeUntil(this.uns), takeUntil(interval(growl.timeout)), takeUntil(growl.close))
          .subscribe((t: number) => {
            const countdown = this.timeleft(growl.timeout, startTime) - 1000;
            growl.percent = Math.round(100 - (countdown * 100 / growl.timeout));
          }, err => { }, () => {
            this.close(gid);
            growl.after();
          });
        setTimeout(() => {
          countr.unsubscribe();
        }, growl.timeout);
      }
      this.growl(gid, growl);
    });
    // RSVP
    this.util.showModalSub.subscribe((modalMsg: ModalMsg) => {
      if (modalMsg && modalMsg.id === 'rsvp') {
        if (modalMsg.show) {
          this.showRsvpModal();
        } else {
          this.hideRsvpModal();
        }
      }
    });
    title.setTitle('Nivite - Loading');
    this.util.userSub.pipe(take(1)).subscribe((user: firebase.User) => {  // One time - invitalize firestore config
      this.util.initializeFirestoreAndSetupInvite();
    });
    this.util.guestSub.pipe(takeUntil(this.uns)).subscribe((guest: Guest) => { // On everytime guest is loaded
      this.guest.emit(guest);
    });
    this.util.inviteSub.pipe(takeUntil(this.uns)).subscribe((invite: Invite) => { // On everytime invite is loaded
      this.invite.emit(invite);
      const cTitle = 'Nivite - ' + (invite ? invite.hostName : ' Oops!');
      const subdscr = invite ? invite.shortMsg : ' Oops!';
      title.setTitle(cTitle);
      const metaTitle = document.querySelector('meta[property="og:title"]');
      if (metaTitle) {
        metaTitle.setAttribute('content', cTitle);
      }
      const metaDescription = document.querySelector('meta[property="og:description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', subdscr);
      }
      const metaSubject = document.querySelector('meta[name="subject"]');
      if (metaSubject) {
        metaSubject.setAttribute('content', subdscr);
      }
    });
    this.util.userSub.pipe(takeUntil(this.uns)).subscribe((user: firebase.User) => {  // On every login/logout
      this.util.setupGuest(user);
      this.login.emit(user);
    });
    this.util.preloadingSub.pipe(takeUntil(this.uns)).subscribe((preloading: Preloading) => { // On loading animcation stop/start
      this.preloads[preloading.id] = preloading;
      this.preloading.emit(preloading);
      if (preloading.show && preloading.timeout) {
        setTimeout(() => {
          delete this.preloads[preloading.id];
          this.preloading.emit(preloading);
        }, preloading.timeout);
      } else {
        delete this.preloads[preloading.id];
        this.preloading.emit(preloading);
      }
    });
  }

  ngOnInit() {
    // If you are changing the margin values - dont forget .growls {top: 70px;}
    this.renderer.setStyle(document.body, 'margin-top', '60px');
    this.renderer.setStyle(document.body, 'margin-bottom', '60px');
    // ATC
    this.util.showModalSub.subscribe((modalMsg: ModalMsg) => {
      if (modalMsg && modalMsg.id === 'atc') {
        if (modalMsg.show) {
          this.showAtcModal();
        } else {
          this.hideAtcModal();
        }
      }
    });
    // RSVP
    this.util.guestSub.pipe(takeUntil(this.uns)).subscribe((guest: Guest) => {
      this.guestCurrent = guest;
      this.resetRsvpForm();
    });
  }
  ngOnDestroy() {
    this.uns.next();
    this.uns.complete();
  }

  // ATC
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    this.hideAtcModal();
    this.clog.hide();
    this.hideRsvpModal();
  }

  hideAtcModal(event?: Event) {
    if (!event || (event.target as Element).classList.contains('modal')) {
      this.renderer.setStyle(this.atcModal.nativeElement, 'display', 'none');
      this.renderer.removeClass(this.atcModal.nativeElement, 'show');
    }
  }
  showAtcModal() {
    this.renderer.setStyle(this.atcModal.nativeElement, 'display', 'block');
    this.renderer.addClass(this.atcModal.nativeElement, 'show');
  }
  // GROWLS
  rnd(): string {
    return Math.random().toString(36).substr(2, 7);
  }
  timeleft(timeoutms: number, startTime: Date): number {
    return timeoutms - Math.abs(+(startTime) - +(new Date()));
  }
  ids(): string[] {
    return Object.keys(this.growls);
  }
  growl(gid: string, growl: Growl) {
    const ids = this.ids();
    if (ids.length >= this.util.growlMax) {
      this.close(ids[0]);
    }
    this.zone.run(() => {
      this.growls[gid] = growl;
    });
  }
  close(id: string) {
    const g = this.growls[id];
    g.close.next();
    g.close.complete();
    this.zone.run(() => {
      delete this.growls[id];
    });
  }
  descOrder = (a: KeyValue<string, Growl>, b: KeyValue<string, Growl>): number => {
    return a.value.id > b.value.id ? 1 : b.value.id > a.value.id ? -1 : 0;
  }
  // NAV
  loginPop() {
    this.util.google(() => { });
    return false;
  }
  // RSVP
  resetRsvpForm() {
    this.fg = this.fb.group({
      ac: this.guestCurrent ? this.guestCurrent.adultCount : 0,
      kc: this.guestCurrent ? this.guestCurrent.kidCount : 0,
      longMsg: this.guestCurrent ? this.guestCurrent.longMsg : ''
    });
  }
  saveRsvp(rsvp: 'Y' | 'N' | 'M') {
    this.savingrsvp = true;
    const newGuest: Guest = {};
    newGuest.rsvp = rsvp;
    newGuest.adultCount = this.fg.get('ac').value;
    newGuest.kidCount = this.fg.get('kc').value;
    newGuest.longMsg = this.fg.get('longMsg').value;
    newGuest.shortMsg = '';
    newGuest.notifyUpdates = true;
    this.util.saveRsvp(newGuest, () => {
      this.savingrsvp = false;
    });
  }
  hideRsvpModal(event?: Event) {
    if (!event || (event.target as Element).classList.contains('modal')) {
      this.renderer.setStyle(this.rsvpModal.nativeElement, 'display', 'none');
      this.renderer.removeClass(this.rsvpModal.nativeElement, 'show');
    }
  }
  showRsvpModal() {
    this.renderer.setStyle(this.rsvpModal.nativeElement, 'display', 'block');
    this.renderer.addClass(this.rsvpModal.nativeElement, 'show');
  }
  isYOrNOrM(rsvp: 'Y' | 'N' | 'M'): boolean {
    return this.util.guest && this.util.guest && this.util.guest.rsvp && (this.util.guest.rsvp === rsvp);
  }
  getRsvp(): string {
    if (this.util.guest && this.util.guest) {
      switch (this.util.guest.rsvp) {
        case 'Y':
          return 'Yes';
        case 'N':
          return 'No';
        case 'M':
          return 'Maybe';
        default:
          break;
      }
    }
    return '';
  }
  getUnApproved(): string {
    if (this.util.guest && this.util.guest.hostApproved) {
      return '';
    }
    return '*';
  }
}
