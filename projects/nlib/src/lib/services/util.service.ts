import * as firebase from 'firebase/app';
import * as moment_ from 'moment-timezone';
import { Injectable, PLATFORM_ID, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invite, Guest, ModalMsg, Growl, Preloading } from '../util/nlib-model';
import { AngularFirestore, Action, DocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
// import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { ClogService } from './clog.service';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  provider = new firebase.auth.GoogleAuthProvider();
  invite: Invite;
  inviteId: string;
  premium: boolean;
  guest: Guest;
  guestId: string;
  retryCnt: number;
  authLoaded = false;
  collapsed = true;
  user: firebase.User;
  userSub: Subject<firebase.User> = new ReplaySubject(1);
  inviteSub: Subject<Invite> = new Subject();
  guestSub: Subject<Guest> = new Subject();
  showModalSub: Subject<ModalMsg> = new Subject();
  preloadingSub: Subject<Preloading> = new Subject();
  growlMax = 5;
  growlSub = new ReplaySubject<Growl>(this.growlMax); // Max 5 growls
  niviteFireAuth: AngularFireAuth;
  customerFireAuth: AngularFireAuth;
  customerFirestore: AngularFirestore;
  customerFirestoreSub: Subject<AngularFirestore> = new ReplaySubject(1);

  matcher = new RegExp(/{(.|\s)*}/);  // https://regex101.com/r/Mb4dBB/1
  replacer = new RegExp(/("(.*?)"|(\w+))(\s*:\s*(".*?"|.))/gm); // https://regex101.com/r/IkZZcp/1

  constructor(private http: HttpClient, private ngZone: NgZone, private clog: ClogService) {
    const url = new URL(window.location.href).searchParams;
    this.inviteId = url.get('iid');                             // invite id
    this.premium = url.get('p') ? true : false;                 // premium/paid version - uses assets/fireconfig.json
    this.clog.visible = url.get('log') ? true : false;          // log - initialize custom console
    this.provider.addScope('profile');
    this.provider.addScope('email');
  }
  initializeFirestoreAndSetupInvite() {
    const preload = new Preloading('Initializing firestore', true);
    this.preloadingSub.next(preload);
    if (this.premium) {
      this.http.get('assets/fireconfig.json').subscribe((config: any) => {
        this.clog.log('host-fireconfig.json: ' + config);
        if (config && config.appId) {
          this.customerFirestore = new AngularFirestore(config, config.appId, false, null, PLATFORM_ID, this.ngZone, null);
          this.customerFirestoreSub.next(this.customerFirestore);
          this.setupAuth(config);
        }
        this.validateAndSetupInvite(preload);
      }, (error) => {
        this.validateAndSetupInvite(preload);
      });
    } else {
      const config = {
        apiKey: 'AIzaSyBdU-x2emmJIv84NuNLGhvFU_l8DlJyAmY',
        appId: '1:212059574978:web:f955498611c402d9',
        databaseURL: 'https://nivite-firebase.firebaseio.com',
        storageBucket: 'nivite-firebase.appspot.com',
        authDomain: 'nivite-firebase.firebaseapp.com',
        messagingSenderId: '212059574978',
        projectId: 'nivite-firebase'
      };
      this.customerFirestore = new AngularFirestore(config, config.appId, false, null, PLATFORM_ID, this.ngZone, null);
      this.customerFirestoreSub.next(this.customerFirestore);
      this.setupAuth(config);
      this.validateAndSetupInvite(preload);
    }
  }
  setupAuth(config: any) {
    const preload = new Preloading('Initializing authentication library', true);
    this.preloadingSub.next(preload);
    if (this.premium) {
      this.customerFireAuth = new AngularFireAuth(config, config.appId, PLATFORM_ID, this.ngZone);
    } else {
      this.niviteFireAuth = new AngularFireAuth(config, config.appId, PLATFORM_ID, this.ngZone);
    }
    if (this.customerFireAuth) {
      this.customerFireAuth.authState.subscribe((user: firebase.User) => {
        this.user = user;
        this.authLoaded = true;
        this.userSub.next(user);
      }, (error) => {
        this.authLoaded = true;
        this.userSub.next(undefined);
      });
    } else if (this.niviteFireAuth) {
      this.niviteFireAuth.authState.subscribe((user: firebase.User) => {
        this.user = user;
        this.authLoaded = true;
        this.userSub.next(user);
      }, (error) => {
        this.authLoaded = true;
        this.userSub.next(undefined);
      });
    } else {
      this.authLoaded = true;
      this.growlSub.next(new Growl('ERROR: FirebaseAuth failed', 'Could not initialize Firebase. Are you online?', 'danger'));
    }
    preload.show = false;
    this.preloadingSub.next(preload);
  }
  setupInvite() {
    const preload = new Preloading('Loading invite details', true);
    this.preloadingSub.next(preload);
    if (this.inviteId && this.customerFirestore) {
      this.customerFirestore.doc<Invite>('nivites/' + this.inviteId).snapshotChanges()
        .pipe(map((inviteDocSnap: Action<DocumentSnapshot<Invite>>) => {
          this.invite = inviteDocSnap.payload.data();
          this.inviteId = inviteDocSnap.payload.id;
          this.invite.timeFrom = this.ifNumberMoment(this.invite.timeFrom, this.invite.tz);
          this.invite.timeTo = this.ifNumberMoment(this.invite.timeTo, this.invite.tz);
          this.invite.timeFromString = this.ifMomentString(this.invite.timeFrom);
          this.invite.timeToString = this.ifMomentString(this.invite.timeTo);
          return inviteDocSnap;
        })).subscribe((inviteDocSnap: Action<DocumentSnapshot<Invite>>) => {
          this.inviteSub.next(this.invite);
          preload.show = false;
          this.preloadingSub.next(preload);
        }, (error) => {
          this.growlSub.next(new Growl('ERROR: Invalid invite'
            , 'Could not load invite with iid=' + this.inviteId + '. Invalid iid?', 'danger'));
          this.inviteSub.next(undefined);
          preload.show = false;
          this.preloadingSub.next(preload);
        });
    }
  }
  setupGuest(user: firebase.User) {
    if (this.inviteId && this.customerFirestore) {
      const preload = new Preloading('Loading guest details', true);
      this.preloadingSub.next(preload);
      if (user) { // login
        this.customerFirestore.collection('nivites/' + this.inviteId + '/guests', ref => ref.where('email', '==', this.user.email))
          .get().subscribe((guestDocChgAc: QuerySnapshot<Guest>) => {
            this.clog.log(`Find by email: ${this.user.email}, size: ${guestDocChgAc.size}`);
            if (guestDocChgAc.size > 0) { // found by email
              this.guestId = guestDocChgAc.docs[0].id;
              this.listenGuest();
            } else {
              this.clog.log('Adding new.');
              this.addNewGuest();
            }
            preload.show = false;
            this.preloadingSub.next(preload);
          }, (error) => {
            this.growlSub.next(new Growl('ERROR: Setup Guest'
              , 'Could not load guest with email=' + this.user.email + '. Please try after sometime', 'danger'));
            preload.show = false;
            this.preloadingSub.next(preload);
          });
      } else { // logout
        this.guest = undefined;
        this.guestSub.next(this.guest);
        preload.show = false;
        this.preloadingSub.next(preload);
      }
    }
  }
  saveRsvp(guest: Guest, cb: () => void) {
    if (!this.customerFirestore) {
      cb();
    } else {
      this.customerFirestore.doc<Guest>('nivites/' + this.inviteId + '/guests/' + this.guestId).update(guest)
        .then(() => {
          this.showModalSub.next({ id: 'rsvp', show: false });
          this.growlSub.next(new Growl('SUCCESS: Saved your response', `Your response ${guest.rsvp} is saved`
            , 'success', () => { }, 60 * 1000, true));
        }).catch((error) => {
          this.clog.log(error);
        }).finally(() => cb());
    }
  }
  check(): Observable<firebase.User> {
    return this.userSub.asObservable();
  }
  google(cb: () => void) {
    if (this.niviteFireAuth) {
      this.niviteFireAuth.auth.signInWithPopup(this.provider).then((uc: firebase.auth.UserCredential) => {
        cb();
      });
    } else if (this.customerFireAuth) {
      this.customerFireAuth.auth.signInWithPopup(this.provider).then((uc: firebase.auth.UserCredential) => {
        cb();
      });
    }
  }
  logout() {
    if (this.niviteFireAuth) { this.niviteFireAuth.auth.signOut(); }
    if (this.customerFireAuth) { this.customerFireAuth.auth.signOut(); }
  }
  toggleNav() {
    this.collapsed = !this.collapsed;
  }
  hideNav() {
    this.collapsed = true;
  }
  showModal(id: 'rsvp' | 'atc') {
    if (!this.user && id === 'rsvp' && this.inviteId) { // check this.inviteId - don't show google login in sample mode
      this.google(() => {
        this.showModalSub.next({ id, show: true });
      });
    } else {
      if (!this.guest) {
        this.setupGuest(this.user);
      }
      this.showModalSub.next({ id, show: true });
    }
  }
  isHost(): boolean {
    return this.guest && (this.guest.role === 'HOST' || this.guest.role === 'COLLAB');
  }
  sampleInvite() {
    this.invite = {
      title: 'Demo Invite'
      , shortMsg: 'You are invited'
      , hostName: 'Abigail and Johnny'
      , timeFrom: moment(new Date()).add(1, 'months').local()
      , timeTo: moment(new Date()).add(1, 'months').add(2, 'hours').local()
      , tz: moment.tz.guess()
      , longMsg: 'Please join us in celebration of **demo**\'s 16th birthday. RSVP by '
        + moment(new Date()).add(2, 'weeks').local().format('dddd, MMMM Do YYYY, h:mm:ss a')
      , addrName: 'Cosme'
      , addrText: '35 E 21st St, New York, NY 10010'
      , addrUrl: 'https://www.google.com/search?q=35+E+21st+St%2C+New+York%2C+NY+10010&oq=35+E+21st+St%2C+New+York%2C+NY+10010'
      , addrDetails: 'valet parking available'
      , defaultYes: false
      , showGuests: true
      , autoApproveNewRsvp: true
      , visibleByLink: true
      , styles: ['assets/demostyle.css']
      , scripts: ['assets/demoscript.js']
      , photos: [{
        url: 'assets/demoslider1.jpg'
        , description: '3 layer cake'
        , tags: ['cake', 'food', 'slider']
        , title: 'Birthday cake'
      }, {
        url: 'assets/demoslider2.jpg'
        , description: 'Barbeque grill'
        , tags: ['meat', 'cook', 'bbq', 'slider']
        , title: 'Barbeque'
      }, {
        url: 'assets/demomain.jpg',
        description: 'The main family picture',
        tags: ['main'],
        title: 'Family picture'
      }, {
        url: 'assets/demobg.jpg',
        description: 'Demo background',
        tags: ['bg', 'background'],
        title: 'Background'
      }]
    };
    this.invite.timeFromString = this.ifMomentString(this.invite.timeFrom);
    this.invite.timeToString = this.ifMomentString(this.invite.timeTo);
    setTimeout(() => {
      this.inviteSub.next(this.invite);
    }, 1);
  }
  sampleGuest() {
    this.guest = {
      name: 'Demo Person'
      , email: 'demo.email.for.nivite@gmail.com'
      , role: 'VIEW'
      , rsvp: 'Y'
      , adultCount: 2
      , kidCount: 2
      , longMsg: 'Even thought I\'m _invisible_, I\'ll **definitely** be there'
      , shortMsg: 'Happy Birthday Demo'
      , hostApproved: true
      , notifyUpdates: true
    };
    setTimeout(() => {
      this.guestSub.next(this.guest);
    }, 1);
  }
  makeNewGuest(): Guest {
    return {
      niviteuid: '',
      name: this.user.displayName,
      email: this.user.email,
      adultCount: 0,
      kidCount: 0,
      hostApproved: false,
      longMsg: '',
      notifyUpdates: true,
      role: 'GUEST',
      rsvp: 'V',
      shortMsg: ''
    };
  }
  private validateAndSetupInvite(preload: Preloading) {
    if (this.customerFirestore) {
      if (this.inviteId) {
        this.setupInvite();
      } else {
        this.growlSub.next(new Growl('WARN: Preview mode'
          , 'Missing iid in url.', 'warning'));
        this.sampleInvite();
        this.sampleGuest();
      }
    } else {
      if (this.inviteId) {
        this.growlSub.next(new Growl('WARN: Preview mode'
          , 'Invalid firebase config in fireconfig.json', 'warning'));
      } else {
        this.growlSub.next(new Growl('WARN: Preview mode'
          , 'Invalid firebase config in fireconfig.json and Missing iid in url.', 'warning'));
      }
      this.sampleInvite();
      this.sampleGuest();
    }
    preload.show = false;
    this.preloadingSub.next(preload);
  }
  private listenGuest() {
    this.customerFirestore.doc<Guest>('nivites/' + this.inviteId + '/guests/' + this.guestId).snapshotChanges()
      .subscribe((guestDocSnap: Action<DocumentSnapshot<Guest>>) => {
        this.guest = guestDocSnap.payload.data();
        this.guestId = guestDocSnap.payload.id;
        this.guestSub.next(this.guest);
      }, (error) => {
        this.guestSub.next(undefined);
      });
  }
  private addNewGuest() {
    this.customerFirestore.collection('nivites/' + this.inviteId + '/guests').add(this.makeNewGuest())
      .then((docRef: firebase.firestore.DocumentReference) => {
        docRef.set({ fid: docRef.id }, { merge: true }).then(() => {
          docRef.get().then((docSnap: firebase.firestore.DocumentSnapshot) => {
            this.guestId = docSnap.id;
            this.listenGuest();
          });
        });
      }).catch((error) => {
        // TODO: Alert User that not able to create a new invite.
        this.clog.log(error);
      });
  }
  private ifNumberMoment(input: moment_.Moment | number, tz: string): moment_.Moment {
    if (!input) {
      return undefined;
    }
    return (typeof input === 'number') ? moment.tz(input, tz) : input;
  }
  private ifMomentString(input: moment_.Moment): string {
    return input ? input.local().format('LLLL') : undefined;
  }
}
