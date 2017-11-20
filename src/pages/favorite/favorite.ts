import { Component } from '@angular/core';
import { IonicPage, NavController, Loading } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Recipe } from '../../model/recipe';
import { SpoonacularService } from '../../services/spoonacular';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
  providers: [ SpoonacularService ]
})
export class Favorite {

  recipes: Array<Recipe>;
  loading: Loading;

  constructor(private navCtrl: NavController,
              private db: Database,
              private spoonacular: SpoonacularService) {
  }

  ionViewDidLoad() {
    this.recipes = this.db.favoriteRecipes;
  }

  favoriteToggle(recipe: Recipe) {
    recipe.favorite = !recipe.favorite;

    if (recipe.favorite) {
      this.db.addFavoriteRecipe(recipe);
    } else {
      this.db.removeFavoriteRecipe(recipe);
    }
  }

  goToDetails(recipeId: number) {
      this.presentLoading('Please wait...');
      this.spoonacular.getDetails(recipeId).subscribe(
          data => {
            this.dismissLoading();
            this.navCtrl.push('Details', { recipe: data });
          },
          err => console.error(err),
          () => console.log('getDetails completed')
      );
  }

  private presentLoading(content: string) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

  private dismissLoading() {
    this.loading.dismiss();
  }

}
