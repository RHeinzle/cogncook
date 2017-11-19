import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Database } from '../../providers/database';
import { Cuisine } from '../../model/cuisine';
import { Intolerance } from '../../model/intolerance';
import { Diet } from '../../model/diet';
import { Ingredient } from '../../model/ingredient';
import { Recipe } from '../../model/recipe';
import { SpoonacularService } from '../../services/spoonacular';
import { WatsonService } from '../../services/watson';
import { Helper } from '../../services/helper';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [ SpoonacularService, WatsonService, Helper ]
})
export class Search {

  recipes: Array<Recipe>;

  cuisine: Cuisine;
  intolerances: Array<Intolerance>;
  diet: Diet;

  cuisineOptions: Array<Cuisine>;
  intoleranceOptions: Array<Intolerance>;
  dietOptions: Array<Diet>;

  ingredients: Array<Ingredient>;
  ingredient: string;

  image: any;

  constructor(private navCtrl: NavController,
              private db: Database,
              private camera: Camera,
              private spoonacular: SpoonacularService,
              private watson: WatsonService,
              public helper: Helper) {

    this.cuisineOptions = this.db.cuisines as Array<Cuisine>;
    this.intoleranceOptions = this.db.intolerances as Array<Intolerance>;
    this.dietOptions = this.db.diets as Array<Diet>;

    this.cuisine = new Cuisine();
    this.intolerances = new Array<Intolerance>();
    this.diet = new Diet();

    this.ingredients = new Array<Ingredient>();
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

  getRecipes() {
      this.spoonacular.getRecipes(this.helper.join(this.ingredients.map(ingredients => ingredients.name)),
                                  this.cuisine.name,
                                  this.diet.name,
                                  this.helper.join(this.intolerances.map(intolerances => intolerances.name))
                                ).subscribe(
          data => {
              this.recipes = data;
              this.recipes.forEach(recipe => {
                var exists = this.db.favoriteRecipes.some(function (element) {
                    return element.id === recipe.id;
                });
                if (exists) {
                  recipe.favorite = true;
                }
              })
          },
          err => console.error(err),
          () => console.log('getRecipes completed')
      );
  }

  getIngredient(ingredient: string) {
      if (ingredient) {
          this.spoonacular.getIngredient(ingredient).subscribe(
              data => {
                  this.addIngredient(data);
              },
              err => console.error(err),
              () => console.log('getIngredient completed')
          );
      }
  }

  addIngredient(ingredient: Ingredient) {
      var exists = this.ingredients.some(function (element) {
          return element.id === ingredient.id;
      });
      if (!exists) {
          this.ingredients.push(ingredient);
      }
      this.ingredient = '';
  }

  removeIngredient(ingredient: Ingredient) {
      let index = this.ingredients.indexOf(ingredient);
      this.ingredients.splice(index, 1);
  }


  getImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // destinationType: 0, // TODO tirar fora
      correctOrientation: true
    }

    this.camera.getPicture(options).then(
      imageData => {
            this.watson.upload(imageData).then(
                ingredient => {
                    this.getIngredient(ingredient);
                },
                err => {
                  console.log("aqui2");
                  console.error(err.message);
                }
            );
        },
        err => {
          console.error(err);
        }
    );
  }

  getCamera() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   // destinationType: 0, // TODO tirar fora
    //   correctOrientation: true
    // }

    // this.camera.getPicture(options).then(
    //   imageData => {
    //     let base64Image = 'url(data:image/jpeg;base64,' + imageData + ')';
    //       this.zone.run(() => {
    //         this.image = base64Image;
    //       });
    //     },
    //     err => console.error(err)
    // );
  }

}
