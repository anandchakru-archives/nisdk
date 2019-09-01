import { Injectable } from '@angular/core';
import { Invite, InvitePhoto, Guest } from '../util/nlib-model';

@Injectable({
  providedIn: 'root'
})
export class RService {
  invite: Invite = { title: 'loading', shortMsg: 'loading' };
  guest: Guest = {};
  bgPhoto: InvitePhoto;
  mainPhoto: InvitePhoto;
  slider: InvitePhoto[] = [];
  constructor() { }

  sortImages() {
    this.invite.photos.forEach(photo => {
      if (photo.tags && photo.tags.length) {
        photo.tags.forEach((tag: string) => {
          if (tag && ('bg' === tag.toLowerCase() || 'background' === tag.toLowerCase())) {
            this.bgPhoto = photo;
          } else if (tag && 'main' === tag.toLowerCase()) {
            this.mainPhoto = photo;
          } else if (tag && tag.toLowerCase().indexOf('slider') >= 0) {
            this.slider.push(photo);
          }
        });
      }
    });
  }

}
