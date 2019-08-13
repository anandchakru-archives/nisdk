import * as moment_ from 'moment-timezone';
import { saveAs } from 'file-saver';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class AtcService {
  readonly FORMAT_WITH_Z = 'YYYYMMDD[T]HHmmss[Z]';
  readonly FORMAT = 'YYYYMMDD[T]HHmmss';
  readonly APPLE_SEPARATOR = '\r\n';
  readonly APPLE_START =
    'BEGIN:VCALENDAR' + this.APPLE_SEPARATOR + 'PRODID:nivite.jrvite.com' + this.APPLE_SEPARATOR + 'VERSION:2.0' + this.APPLE_SEPARATOR;
  readonly APPLE_END = this.APPLE_SEPARATOR + 'END:VCALENDAR';

  constructor(private util: UtilService) { }

  public apple(): string {
    const event =
      this.APPLE_START +
      'BEGIN:VEVENT' +
      this.APPLE_SEPARATOR +
      'UID:oid' +
      '@nivite.com' +
      this.APPLE_SEPARATOR +
      'CLASS:PUBLIC' +
      this.APPLE_SEPARATOR +
      'DESCRIPTION:' +
      (this.util.invite.longMsg ? (this.util.invite.longMsg as string).substr(0, 25) + '...' : '') +
      ' ~ nivite.com' +
      this.APPLE_SEPARATOR +
      (this.util.invite.timeFrom
        ? 'DTSTAMP;VALUE=DATE-TIME:' + this.asMomentUtc(this.util.invite.timeFrom, this.FORMAT_WITH_Z) + this.APPLE_SEPARATOR
        : '') +
      (this.util.invite.timeFrom
        ? 'DTSTART;VALUE=DATE-TIME:' + this.asMomentUtc(this.util.invite.timeFrom, this.FORMAT_WITH_Z) + this.APPLE_SEPARATOR
        : '') +
      (this.util.invite.timeFrom
        ? 'DTEND;VALUE=DATE-TIME:' +
        this.asMomentUtc(
          this.util.invite.timeTo ? this.util.invite.timeTo : this.asMomentUtcGuessEnd(this.util.invite.timeFrom),
          this.FORMAT_WITH_Z,
        ) +
        this.APPLE_SEPARATOR
        : '') +
      (this.util.invite.addrText ? 'LOCATION:' + this.util.invite.addrText.split(',').join('\\,') + this.APPLE_SEPARATOR : '') +
      'SUMMARY;LANGUAGE=en-us:' +
      this.util.invite.title +
      this.APPLE_SEPARATOR +
      'TRANSP:TRANSPARENT' +
      this.APPLE_SEPARATOR +
      'END:VEVENT' +
      this.APPLE_END;
    saveAs(new Blob([event]), 'nivite.ics');
    return event; // for jest to unit-test
  }
  public google(): string {
    const details = {
      action: 'TEMPLATE',
      dates:
        this.asMomentUtc(this.util.invite.timeFrom, this.FORMAT_WITH_Z) +
        '/' +
        this.asMomentUtc(this.util.invite.timeTo ? this.util.invite.timeTo :
          this.asMomentUtcGuessEnd(this.util.invite.timeFrom), this.FORMAT_WITH_Z),
      details: this.util.invite.longMsg + '\n\n~' + this.util.invite.hostName + '\nnivite.com',
      location: this.util.invite.addrText,
      sprop: 'website: nivite.com&sprop=name:nivite',
      text: this.util.invite.title,
      trp: true,
    };
    const url = `https://calendar.google.com/calendar/render?${this.stringify(details)}`;
    window.open(url, '_blank');
    return url;
  }
  public microsoft(): string {
    const details = {
      body: this.util.invite.longMsg + '\n\n~' + this.util.invite.hostName + '\nnivite.com',
      enddt: this.asMomentUtc(this.util.invite.timeTo ? this.util.invite.timeTo
        : this.asMomentUtcGuessEnd(this.util.invite.timeFrom), this.FORMAT),
      location: this.util.invite.addrText,
      path: '/calendar/action/compose',
      rru: 'addevent',
      startdt: this.asMomentUtc(this.util.invite.timeFrom, this.FORMAT),
      subject: this.util.invite.title,
    };
    const url = `https://outlook.live.com/owa/?${this.stringify(details)}`;
    window.open(url, '_blank');
    return url;
  }
  public yahoo(): string {
    const details = {
      desc: this.util.invite.longMsg + '\n\n~' + this.util.invite.hostName + '\nnivite.com',
      et: this.asMomentUtc(this.util.invite.timeTo ? this.util.invite.timeTo : this.asMomentUtcGuessEnd(this.util.invite.timeFrom)
        , this.FORMAT_WITH_Z),
      in_loc: this.util.invite.addrText,
      st: this.asMomentUtc(this.util.invite.timeFrom, this.FORMAT_WITH_Z),
      title: this.util.invite.title,
      v: 60,
    };
    const url = `https://calendar.yahoo.com/?${this.stringify(details)}`;
    window.open(url, '_blank');
    return url;
  }
  public ical() {
    return this.apple();
  }
  private stringify(details: any): string {
    return Object.entries(details).reduce((params, [key, value]) => params.set(key, (value as string)), new HttpParams()).toString();
  }
  private asMoment(valueOf: number | moment_.Moment | undefined): moment_.Moment {
    return moment(valueOf);
  }
  private asMomentUtc(valueOf: number | moment_.Moment | undefined, format: string): string {
    return moment(valueOf)
      .utc()
      .format(format);
  }
  private asMomentUtcGuessEnd(valueOf: number | moment_.Moment | undefined): moment_.Moment {
    return moment(valueOf).add(5, 'hours');
  }
}
