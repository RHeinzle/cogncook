import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Recipe } from '../../model/recipe';
import { SpoonacularService } from '../../services/spoonacular';
import { Helper } from '../../services/helper';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
  providers: [ SpoonacularService, Helper ]
})
export class Favorite {

  recipes: Array<Recipe>;

  constructor(private navCtrl: NavController,
              private db: Database,
              private spoonacular: SpoonacularService,
              public helper: Helper) {
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
    this.helper.showLoading('Please wait...');
    this.spoonacular.getDetails(recipeId).subscribe(
        data => {
          this.navCtrl.push('Details', { recipe: data });
        },
        err => {
          this.helper.dismissLoading();
        },
        () => this.helper.dismissLoading()
    );
  }

}
