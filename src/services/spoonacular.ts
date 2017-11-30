import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Ingredient } from '../model/ingredient';
import { Instruction } from '../model/instruction';
import { Nutrient } from '../model/nutrient';
import { Recipe } from '../model/recipe';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SpoonacularService {

    private static readonly host: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com'
    private static readonly key: string = 'z3GA7qg7ELmshr4gsIH9yUKYBUmtp19rOTwjsnvCeHjEbxoA1s';
    private headers: Headers;

    constructor(private http: Http) {
      this.headers = new Headers();
      this.headers.append('X-Mashape-Key', SpoonacularService.key);
    }

    getRecipes(ingredients: string, cuisine: string, diet: string, intolerances: string): Observable<Array<Recipe>> {
      const endpoint = '/recipes/searchComplex';

      let params = new URLSearchParams();
      params.set('number', '5');
      params.set('includeIngredients', ingredients);
      params.set('cuisine', cuisine);
      params.set('diet', diet);
      if (ingredients != '' || cuisine != '' || diet != '') {
          params.set('intolerances', intolerances);
      }

      const url = SpoonacularService.host + endpoint + "?" + params.toString();

      /*MOCK*/
      // return this.http.get('assets/mock/searchComplex.json').map(data => {

      return this.http.get(url, {headers: this.headers}).map(data => {
          let recipes = new Array<Recipe>();
          data.json().results.forEach(result => {
              let recipe = new Recipe();
              recipe.id = result.id;
              recipe.title = result.title;
              recipe.image = result.image;
              recipes.push(recipe);
          });
          return recipes;
      });
    }

    getDetails(recipeId: number): Observable<Recipe> {
        const endpoint = `/recipes/${recipeId}/information`;

        let params = new URLSearchParams();
        params.set('includeNutrition', 'true');

        const url = SpoonacularService.host + endpoint + "?" + params.toString();

        /*MOCK*/
        // return this.http.get('assets/mock/information.json').map(data => {

        return this.http.get(url, {headers: this.headers}).map(data => {
          let result = data.json();

          let ingredients = new Array<Ingredient>();
          result.extendedIngredients.forEach(result => {
              let ingredient = new Ingredient(result.id, result.name, result.image, result.amount, result.unitShort);
              ingredients.push(ingredient);
          });

          let instructions = new Array<Instruction>();
          result.analyzedInstructions[0].steps.forEach(result => {
              let instruction = new Instruction(result.number, result.step);
              instructions.push(instruction);
          });

          let nutrients = new Array<Nutrient>();
          result.nutrition.nutrients.forEach(result => {
              let nutrient = new Nutrient(result.title, result.amount, result.unit, result.percentOfDailyNeeds);
              nutrients.push(nutrient);
          });

          let recipe = new Recipe(result.id, result.title, result.image, result.vegetarian, result.vegan, result.glutenFree, result.dairyFree,
                                  result.servings, result.readyInMinutes, result.spoonacularSourceUrl, ingredients, instructions, nutrients);

          return recipe;
        });
    }

    getIngredient(ingredient: string): Observable<Ingredient> {
        const endpoint = '/recipes/parseIngredients';
        const url = SpoonacularService.host + endpoint;

        let params = new URLSearchParams();
        params.set('ingredientList', ingredient);

        /*MOCK*/
        // return this.http.get('assets/mock/parseIngredients.json').map(data => {

        return this.http.post(url, params.toString(), {headers: this.headers}).map(data => {
            let result = data.json()[0];
            if (result != null && result.id) {
              let ingredient = new Ingredient();
              ingredient.id = result.id;
              ingredient.name = result.name;
              ingredient.image = result.image;
              return ingredient;
            }  else {
              throw new Error('Ingredient not found');
            }
        });

    }

}
