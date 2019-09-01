import { Injectable } from '@angular/core';
import { Invite, InvitePhoto, Guest } from '../util/nlib-model';
import { UtilService } from './util.service';
import { Preloading } from '../util/nlib-model';

@Injectable({
  providedIn: 'root'
})
export class RService {
  invite: Invite;
  guest: Guest = {};
  bgPhoto: InvitePhoto;
  mainPhoto: InvitePhoto;
  slider: InvitePhoto[] = [];
  preload = new Preloading('Initializing renderer', true);
  constructor(private util: UtilService) { }

  sortImages() {
    this.util.preloadingSub.next(this.preload);
    this.invite.photos.forEach(photo => {
      if (photo.tags && photo.tags.length) {
        photo.tags.forEach((tag: string) => {
          if (tag) {
            const ttag = tag.trim();
            if ((ttag.toLowerCase() === 'bg' || ttag.toLowerCase() === 'background')) {
              this.bgPhoto = photo;
            } else if (ttag.toLowerCase() === 'main') {
              this.mainPhoto = photo;
            } else if (ttag.toLowerCase().indexOf('slider') >= 0) {
              this.slider.push(photo);
            }
          }
        });
      }
    });
    setTimeout(() => {
      this.util.preloadingSub.next(this.preload);
    }, 500);
  }

}
