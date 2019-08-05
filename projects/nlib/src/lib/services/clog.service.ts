import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClogService {
  public count = 1;
  public visible = false;
  public lines: string[] = [this.count + ': clog initialized'];
  constructor() { }

  log(msg: string) {
    if (this.count > 10000) {
      this.clear();
    } else {
      this.count++;
    }
    this.lines.push(`${this.count}: ${msg}`);
    console.log(`clogd: ${this.count}: ${msg}`);
  }
  clear() {
    this.count = 0;
    this.lines = [];
  }
  toggle() {
    this.visible = !this.visible;
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  copy(msg: string) {// https://stackoverflow.com/a/30810322/234110
    const textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = msg;
    document.body.appendChild(textArea);
    textArea.focus();
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      this.log('iOS');
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
    try {
      const result = document.execCommand('copy');
      this.log('Copy: ' + (result ? 'success' : 'unsuccess'));
    } catch (err) {
      this.log('Copy fail:' + err);
    }
    document.body.removeChild(textArea);
  }
}
