import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
      this.spoonacular.getDetails(recipeId).subscribe(
          data => {
              this.navCtrl.push('Details', { recipe: data });
          },
          err => console.error(err),
          () => console.log('getDetails completed')
      );
  }

}
