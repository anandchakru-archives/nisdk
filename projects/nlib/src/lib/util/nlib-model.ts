import * as moment from 'moment-timezone';
import { Subject, Observable } from 'rxjs';

export class NlibModel {
}

export interface InvitePhoto {
  url: string;
  tags: string[];
  title: string;
  description: string;
}
export interface Guest {
  niviteuid?: string; // nivite auth uid
  uid?: string; // auth uid (on customerFirestore)
  fid?: string; // firebase record id (on customerFirestore)
  name?: string;
  email?: string;

  role?: 'HOST' | 'COLLAB' | 'GUEST' | 'VIEW';
  rsvp?: 'Q' | 'P' | 'V' | 'B' | 'Y' | 'N' | 'M' | 'O' | 'Z'; // Queued | Pending | Viewed | Blocked | Yes | No | Maybe | Optout | Not invited (only imported from google contacts)
  adultCount?: number;
  kidCount?: number;
  longMsg?: string;
  shortMsg?: string;
  hostApproved?: boolean;
  notifyUpdates?: boolean;
}

export interface Invite {
  title: string;
  shortMsg: string;
  hostName?: string;
  timeFrom?: moment.Moment | number;
  timeTo?: moment.Moment | number;
  tz?: string;
  longMsg?: string;
  addrName?: string;
  addrText?: string;
  addrUrl?: string;
  addrDetails?: string;
  inviteUrl?: string;
  defaultYes?: boolean;         // No  -  (default) free version, Yes - paid version
  showGuests?: boolean;         // Yes -  (default) free version, No  - paid version
  autoApproveNewRsvp?: boolean; // Yes -  (default) free version, No  - paid version
  visibleByLink?: boolean;      // Yes -  (default) free version, No  - paid version
  photos?: InvitePhoto[];
  guests?: Guest[];
  styles?: string[];            // array of external style css
  scripts?: string[];           // array of external javascripts
  /* _dateFrom?: Date;
  _dateTo?: Date;
  _timeFrom?: Date;
  _timeTo?: Date; */
  timeFromString?: string;            // converted to user's local timezone
  timeToString?: string;              // converted to user's local timezone
}

export interface ModalMsg {
  id: 'rsvp' | 'atc';
  show: boolean;
}

export class Growl {
  private static COUNTER = 1;
  constructor(public title: string, public body?: string,
    public type?: undefined | 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'dark', public after?: () => void
    , public timeout?: number, public autoclose?: boolean) {
    if (!type) {
      this.type = 'success';
    }
    if (timeout) {
      this.autoclose = true;
    } else {
      this.timeout = 5 * 60000; // 5 mins
    }
  }
  id = Growl.COUNTER++;
  percent: number;
  close = new Subject();
  counter: Observable<number>;
}

export class Preloading {
  constructor(
    public msg = 'Loading..',
    public show = false,
    public timeout = 1500,
    public id?: string) {
    if (!id) {
      this.id = Math.random().toString(36).substr(2, 7);
    }
  }
}
