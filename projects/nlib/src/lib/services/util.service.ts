import * as firebase from 'firebase/app';
import * as moment_ from 'moment-timezone';
import { Injectable, PLATFORM_ID, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invite, Guest, ModalMsg, Growl } from '../util/nlib-model';
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
  growlMax = 5;
  growlSub = new ReplaySubject<Growl>(this.growlMax); // Max 5 growls
  // Hard coding for now, because CORS blocked https://nivite.jrvite.com/__/firebase/init.js
  // Find a way to do this:
  // this.http.get('https://nivite.jrvite.com/__/firebase/init.js').subscribe((rsp) => {
  //   this.niviteFireAuth = new AngularFireAuth(this.firebaseWebConfig, this.firebaseWebConfig.appId, PLATFORM_ID, this.ngZone);
  // });
  niviteFirebaseWebConfig = {
    apiKey: 'AIzaSyDUFUg-yCwu0GbvSf8DJ-17WlzcgnbZhzo',
    appId: '1:212059574978:web:f955498611c402d9',
    databaseURL: 'https://nivite-firebase.firebaseio.com',
    storageBucket: 'nivite-firebase.appspot.com',
    authDomain: 'nivite-firebase.firebaseapp.com',
    messagingSenderId: '212059574978',
    projectId: 'nivite-firebase'
  };
  niviteFireAuth: AngularFireAuth;
  customerFirestore: AngularFirestore;
  // customerFireStorage: AngularFireStorage;

  constructor(private http: HttpClient, private ngZone: NgZone, private clog: ClogService) {
    this.niviteFireAuth = new AngularFireAuth(this.niviteFirebaseWebConfig, this.niviteFirebaseWebConfig.appId, PLATFORM_ID, this.ngZone);
    if (this.niviteFireAuth) {
      this.provider.addScope('profile');
      this.provider.addScope('email');
      this.niviteFireAuth.authState.subscribe((user: firebase.User) => {
        this.user = user;
        this.authLoaded = true;
        this.userSub.next(user);
      }, (error) => {
        this.authLoaded = true;
        this.userSub.next(undefined);
      });
    }
    const url = new URL(window.location.href).searchParams;
    this.inviteId = url.get('iid');       // invite id
    this.clog.visible = url.get('log') ? true : false;         // log - initialize custom console
  }
  initializeFirestoreAndSetupInvite(hostFirestoreWebConfig: any/* gapi.client.firebase.WebAppConfig */) {
    if (!hostFirestoreWebConfig || !hostFirestoreWebConfig.appId) {
      console.log('Invalid fireconfig, trying window.fireconfig');
      hostFirestoreWebConfig = (window as any).fireconfig;
    }
    if (hostFirestoreWebConfig && hostFirestoreWebConfig.appId) {
      this.customerFirestore = new AngularFirestore(
        hostFirestoreWebConfig, hostFirestoreWebConfig.appId, false, null, PLATFORM_ID, this.ngZone, null);
      /* this.customerFireStorage = new AngularFireStorage(
        hostFirestoreWebConfig, hostFirestoreWebConfig.appId, hostFirestoreWebConfig.storageBucket, PLATFORM_ID, this.ngZone); */
    }
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
          , 'Invalid firebase config in environment(.prod).ts', 'warning'));
      } else {
        this.growlSub.next(new Growl('WARN: Preview mode'
          , 'Invalid firebase config in environment(.prod).ts and Missing iid in url.', 'warning'));
      }
      this.sampleInvite();
      this.sampleGuest();
    }
  }
  setupInvite() {
    if (this.inviteId && this.customerFirestore) {
      this.customerFirestore.doc<Invite>('nivites/' + this.inviteId).snapshotChanges()
        .pipe(map((inviteDocSnap: Action<DocumentSnapshot<Invite>>) => {
          this.invite = inviteDocSnap.payload.data();
          this.inviteId = inviteDocSnap.payload.id;
          this.invite.timeFrom = this.ifNumberMoment(this.invite.timeFrom);
          this.invite.timeTo = this.ifNumberMoment(this.invite.timeTo);
          return inviteDocSnap;
        })).subscribe((inviteDocSnap: Action<DocumentSnapshot<Invite>>) => {
          this.inviteSub.next(inviteDocSnap.payload.data());
        }, (error) => {
          this.growlSub.next(new Growl('ERROR: Invalid invite'
            , 'Could not load invite with iid=' + this.inviteId + '. Invalid iid?', 'danger'));
          this.inviteSub.next(undefined);
        });
    }
  }
  setupGuest(user: firebase.User) {
    if (this.inviteId && this.customerFirestore) {
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
          }, (error) => {
            this.growlSub.next(new Growl('ERROR: Preview mode'
              , 'Could not load invite with iid=' + this.inviteId + '. Invalid iid?', 'danger'));
          });
      } else { // logout
        this.guest = undefined;
        this.guestSub.next(this.guest);
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
    this.niviteFireAuth.auth.signInWithPopup(this.provider).then((uc: firebase.auth.UserCredential) => {
      cb();
    });
  }
  logout() {
    this.niviteFireAuth.auth.signOut();
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
      , photos: [{
        url: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        , description: '3 layer cake'
        , tags: ['cake', 'food', 'slider']
        , title: 'Birthday cake'
      }, {
        url: 'https://images.pexels.com/photos/1105325/bbq-meet-eating-diner-1105325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        , description: 'Barbeque grill'
        , tags: ['meat', 'cook', 'bbq', 'slider']
        , title: 'Barbeque'
      }]
    };
    this.inviteSub.next(this.invite);
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
    this.guestSub.next(this.guest);
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
  private ifNumberMoment(input: moment_.Moment | number): moment_.Moment {
    return (typeof input === 'number') ? moment(input) : input;
  }
}
