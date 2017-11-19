import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Recipe } from '../../model/recipe';

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class Share {

  recipe: Recipe;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private socialSharing: SocialSharing) {

    this.recipe = this.navParams.get('recipe');

  }

  facebook() {
    this.socialSharing.shareViaFacebook(this.recipe.title, this.recipe.image, this.recipe.spoonacularSourceUrl);
  }

  twitter() {
    this.socialSharing.shareViaTwitter(this.recipe.title, this.recipe.image, this.recipe.spoonacularSourceUrl);
  }

  link() {
    this.socialSharing.share('', this.recipe.title, this.recipe.image, this.recipe.spoonacularSourceUrl);
  }

  close() {
    this.navCtrl.pop();
  }
}
