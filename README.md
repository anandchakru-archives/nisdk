[Nivite.com](https://nivite.jrvite.com)

<!-- 
## nlib
The Core library, built using angular 8. This can be used to interact with invites created on [Nivite.com](https://nivite.jrvite.com).
If you are creating your own angular based invites, you can include this directly by doing. 
#### Samples:

[dummy](https://nivite-nlib-demo1.stackblitz.io/) 

[Live]() TBD

[angular]() TBD

[react]() TBD

[vue]() TBD

[plainjs]() TBD



```sh
npm i @nivite/nisdk

# install dependencies
npm i angularfire2 bootstrap file-saver firebase moment moment-timezone ngx-markdown
```

```js
// app.module.ts
import { NlibModule } from 'nlib';
@NgModule({
  declarations: [
    AppComponent, ...
  ],
  imports: [
    NlibModule, ...
  ],
  providers: [...],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

##### app.component.html
```html
<nlib-nivite (invite)="loadInviteData($event)" (login)="loadUserData($event)" (guest)="loadGuestData($event)"></nlib-nivite>
```

```js
// app.component.ts
  fireconf = { apiKey: 'GET_YOURS_AT_https://console.firebase.google.com', authDomain: 'REPLACEME', databaseURL: 'REPLACEME', projectId: 'REPLACEME', storageBucket: 'REPLACEME', messagingSenderId: 'REPLACEME', appId: 'REPLACEME' };
  invite: any;
  guest: any;
  constructor() { }
  loadInviteData(invite: any) {
    // called when invite loaded
    this.invite = invite;
  }
  loadUserData(user: any) {
    // called when user login/logout load
  }
  loadGuestData(guest: any) {
    // called when guest loaded
    this.guest = guest;
  }
```
## nelem
The Wrapper around nlib, enables stand alone js webpages, react js applications, vue js applications, to interact with invites created on [Nivite.com](https://nivite.jrvite.com). Include the js and do the following to get started

##### index.html
```html
<head>
  <script src="https://github.com/nivite/nisdk/releases/latest/download/nivite-sdk-es2015.js"></script>
</head>
<body>
  <nelem-nivite></nelem-nivite>
  <script>
    const elemArray = document.getElementsByTagName("nelem-nivite");
    if (elemArray && elemArray.length) {
      const elem = elemArray[0];
      elem.setAttribute("firebase", "{ apiKey: 'GET_YOURS_AT_https://console.firebase.google.com', authDomain: 'REPLACEME', databaseURL: 'REPLACEME', projectId: 'REPLACEME', storageBucket: 'REPLACEME', messagingSenderId: 'REPLACEME', appId: 'REPLACEME' }");
      elem.addEventListener("login", (userevent) => {
        if (userevent.detail) {
          console.log('logged in as: ' + userevent.detail.displayName + ' - ' + userevent.detail.email);
        } else {
          console.log('logoff event');
        }
      }, false);
      elem.addEventListener("invite", (inviteevent) => {
        if (inviteevent.detail) {
          console.log('invite: ' + JSON.stringify(inviteevent.detail));
        }
      }, false);
      elem.addEventListener("guest", (guestevent) => {
        if (guestevent.detail) {
          console.log('guest event: ' + JSON.stringify(guestevent.detail));
        }
      }, false);
    }
  </script>
</body>
```

## ntest
Used only to test nlib. Not exported to [@nivite/nisdk](https://www.npmjs.com/package/@nivite/nisdk)


#### Local setup

```sh
#build library with watch flag
npm run start:lib

#build app
npm run start:app
```

#### Publish
```sh
./config/all.sh "commit message"

```

#### @angular/cli reference

```sh
ng new nisdk --style scss --prefix nivite --routing=false --create-application=false

npm i angularfire2 bootstrap file-saver firebase moment moment-timezone ngx-markdown
npm i -D fs-extra concat replace-in-file

ng g application ntest --style scss --prefix ntest --routing=false
ng g library nlib --prefix nlib
ng g application nelem --style scss --prefix nelem --routing=false
ng add @angular/elements --project=nelem
# ng add angular-cli-ghpages --project=nelem

# nlib services
ng g service services/util --project=nlib
ng g service services/clog --project=nlib
ng g service services/atc --project=nlib
ng g service services/r --project=nlib

ng g component components/r-default --project=nlib
ng g component components/r-guest --project=nlib
ng g component components/r-bg --project=nlib
ng g component components/r-main --project=nlib
ng g component components/r-main-title --project=nlib
ng g component components/r-main-short-msg --project=nlib
ng g component components/r-main-img --project=nlib
ng g component components/r-main-long-msg --project=nlib
ng g component components/r-slider --project=nlib
ng g component components/r-details --project=nlib
ng g component components/r-details-addr --project=nlib
ng g component components/r-details-addr-title --project=nlib
ng g component components/r-details-addr-text --project=nlib
ng g component components/r-details-time --project=nlib
ng g component components/r-details-time-from --project=nlib
ng g component components/r-details-time-from-title --project=nlib
ng g component components/r-details-time-from-text --project=nlib
ng g component components/r-details-time-to --project=nlib
ng g component components/r-details-time-to-title --project=nlib
ng g component components/r-details-time-to-text --project=nlib

#rename nlib to @nivite/nlib in ./projects/nlib/package.json

```
-->