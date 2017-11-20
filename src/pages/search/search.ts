import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
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

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
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

  getIngredient(ingredient: string) {
    this.spoonacular.getIngredient(ingredient).subscribe(
      data => {
        this.addIngredient(data);
      },
      err => console.error(err),
      () => console.log('getIngredient completed')
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
                let exists = this.db.favoriteRecipes.some(function (element) {
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

  getImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(
      imageData => {
        this.classify(imageData);
      },
      err => console.error(err)
    );
  }

  getCamera() {
    const options: CameraOptions = {
      correctOrientation: true
    }

    this.camera.getPicture(options).then(
      imageData => {
        this.classify(imageData);
      },
      err => console.error(err)
    );
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

  favoriteToggle(recipe: Recipe) {
    recipe.favorite = !recipe.favorite;

    if (recipe.favorite) {
      this.db.addFavoriteRecipe(recipe);
    } else {
      this.db.removeFavoriteRecipe(recipe);
    }
  }

  removeIngredient(ingredient: Ingredient) {
      let index = this.ingredients.indexOf(ingredient);
      this.ingredients.splice(index, 1);
  }

  private addIngredient(ingredient: Ingredient) {
      let exists = this.ingredients.some(function (element) {
          return element.id === ingredient.id;
      });
      if (!exists) {
          this.ingredients.push(ingredient);
      }
      this.ingredient = '';
  }

  private classify(imageData: string) {
    this.watson.classify(imageData).then(
        classes => {
          if (classes.length > 1) {
            let ingredients = new Array<string>();
            classes.forEach(c => {
                ingredients.push(this.helper.capitalizeFirstLetter(c.class));
            });
            this.chooseIngredient(ingredients);
          } else {
            this.getIngredient(classes[0].class);
          }
        },
        err => console.error(err)
    );
  }

  private chooseIngredient(ingredients: Array<string>) {
    let inputs = new Array<Object>();
    ingredients.forEach(ingredient => {
      inputs.push({
        type:'radio',
        label: ingredient,
        value: ingredient,
      });
    });
    let prompt = this.alertCtrl.create({
      title: 'Choose the right option',
      inputs: inputs,
      buttons: [
      {
          text: "Cancel",
          handler: data => {}
      },
      {
          text: "Ok",
          handler: data => {
            this.getIngredient(data);
          }
      }]
    });
    return prompt.present();
  }

}
