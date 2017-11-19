import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';
import { FileTransfer } from '@ionic-native/file-transfer';

import { Database } from '../providers/database';
import { Helper } from '../services/helper';

import { keyboardFix } from '../components/keyboard-fix/keyboard-fix'
import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [
    MyApp,
    keyboardFix
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ElasticModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      menuType: 'overlay',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false,
          inputBlurring: false,
          statusbarPadding: true,
        },
        android: {
          scrollAssist: false,
          autoFocusAssist: false,
        }
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    SocialSharing,
    Keyboard,
    FileTransfer,
    Database,
    Helper
  ]
})
export class AppModule {}
