import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class Helper {

  loading: Loading;

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  showAlert(title: string, buttons?: Array<Object>, inputs?: Array<Object>) {
    if (buttons == null) {
      buttons = [
        {
          text: 'Ok'
        }
      ];
    }
    let alert = this.alertCtrl.create({
      title: title,
      buttons: buttons,
      inputs: inputs
    });
    alert.present();
  }

  showLoading(content: string) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  join(str: string[]): string {
    return (str ? str.join(',') : '');
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
