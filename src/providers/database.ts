import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';

@Injectable()
export class Database {

  cuisines: any;
  diets: any;
  intolerances: any;
  favoriteRecipes: Array<Recipe>;

  constructor() {
    this.init();
    this.favoriteRecipes = new Array<Recipe>();
  }

  private init() {

    /**
      id: string;
      name: string;
     */
    this.cuisines = [
      {
        id: 1,
        name: 'African',
      },
      {
        id: 2,
        name: 'Chinese',
      },
      {
        id: 3,
        name: 'Japanese',
      },
      {
        id: 4,
        name: 'Korean',
      },
      {
        id: 5,
        name: 'Vietnamese',
      },
      {
        id: 6,
        name: 'Thai',
      },
      {
        id: 7,
        name: 'Indian',
      },
      {
        id: 8,
        name: 'British',
      },
      {
        id: 9,
        name: 'Irish',
      },
      {
        id: 10,
        name: 'French',
      },
      {
        id: 11,
        name: 'Italian',
      },
      {
        id: 12,
        name: 'Mexican',
      },
      {
        id: 13,
        name: 'Spanish',
      },
      {
        id: 14,
        name: 'Middle eastern',
      },
      {
        id: 15,
        name: 'Jewish',
      },
      {
        id: 16,
        name: 'American',
      },
      {
        id: 17,
        name: 'Cajun',
      },
      {
        id: 18,
        name: 'Southern',
      },
      {
        id: 19,
        name: 'Greek',
      },
      {
        id: 20,
        name: 'German',
      },
      {
        id: 21,
        name: 'Nordic',
      },
      {
        id: 22,
        name: 'Eastern european',
      },
      {
        id: 23,
        name: 'Caribbean',
      },
      {
        id: 24,
        name: 'Latin american',
      }
    ];

    /**
      id: string;
      name: string;
     */
    this.diets = [
      {
        id: 1,
        name: 'Pescetarian',
      },
      {
        id: 2,
        name: 'Lacto vegetarian',
      },
      {
        id: 3,
        name: 'Ovo vegetarian',
      },
      {
        id: 4,
        name: 'Vegan',
      },
      {
        id: 5,
        name: 'Vegetarian'
      }
    ];

    /**
      id: string;
      name: string;
     */
    this.intolerances = [
      {
        id: 1,
        name: 'Dairy',
      },
      {
        id: 2,
        name: 'Egg',
      },
      {
        id: 3,
        name: 'Gluten',
      },
      {
        id: 4,
        name: 'Peanut',
      },
      {
        id: 5,
        name: 'Sesame',
      },
      {
        id: 6,
        name: 'Seafood',
      },
      {
        id: 7,
        name: 'Shellfish',
      },
      {
        id: 8,
        name: 'Soy',
      },
      {
        id: 9,
        name: 'Sulfite',
      },
      {
        id: 10,
        name: 'Tree nut',
      },
      {
        id: 11,
        name: 'Wheat'
      }
    ];

  }

  addFavoriteRecipe(recipe: Recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFavoriteRecipe(recipe: Recipe) {
      let index = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(index, 1);
  }

}
