import { Ingredient } from './ingredient';
import { Instruction } from './instruction';
import { Nutrient } from './nutrient';

export class Recipe {

  private _id: number;
  private _title: string;
  private _image: string;
  private _vegetarian: boolean;
  private _vegan: boolean;
  private _glutenFree: boolean;
  private _dairyFree: boolean;
  private _servings: number;
  private _readyInMinutes: number;
  private _spoonacularSourceUrl: string;
  private _ingredients: Array<Ingredient>;
  private _instructions: Array<Instruction>;
  private _nutrients: Array<Nutrient>;
  private _favorite: boolean;

  constructor();
  constructor(id: number, title: string, image: string, vegetarian: boolean, vegan: boolean, glutenFree: boolean, dairyFree: boolean, servings: number,
              readyInMinutes: number, spoonacularSourceUrl: string, ingredients: Array<Ingredient>, instructions: Array<Instruction>, nutrients: Array<Nutrient>);

  constructor(id?: number, title?: string, image?: string, vegetarian?: boolean, vegan?: boolean, glutenFree?: boolean, dairyFree?: boolean, servings?: number,
              readyInMinutes?: number, spoonacularSourceUrl?: string, ingredients?: Array<Ingredient>, instructions?: Array<Instruction>, nutrients?: Array<Nutrient>) {

    this.id = id;
    this.title = title;
    this.image = image;
    this.vegetarian = vegetarian;
    this.vegan = vegan;
    this.glutenFree = glutenFree;
    this.dairyFree = dairyFree;
    this.servings = servings;
    this.readyInMinutes = readyInMinutes;
    this.spoonacularSourceUrl = spoonacularSourceUrl;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.nutrients = nutrients;
    this.favorite = false;

  }

  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  get title(): string {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }

  get image(): string {
    return this._image;
  }
  set image(image: string) {
    this._image = image;
  }

  get vegetarian(): boolean {
    return this._vegetarian;
  }
  set vegetarian(vegetarian: boolean) {
    this._vegetarian = vegetarian;
  }

  get vegan(): boolean {
    return this._vegan;
  }
  set vegan(vegan: boolean) {
    this._vegan = vegan;
  }

  get glutenFree(): boolean {
    return this._glutenFree;
  }
  set glutenFree(glutenFree: boolean) {
    this._glutenFree = glutenFree;
  }

  get dairyFree(): boolean {
    return this._dairyFree;
  }
  set dairyFree(dairyFree: boolean) {
    this._dairyFree = dairyFree;
  }

  get servings(): number {
    return this._servings;
  }
  set servings(servings: number) {
    this._servings = servings;
  }

  get readyInMinutes(): number {
    return this._readyInMinutes;
  }
  set readyInMinutes(readyInMinutes: number) {
    this._readyInMinutes = readyInMinutes;
  }

  get spoonacularSourceUrl(): string {
    return this._spoonacularSourceUrl;
  }
  set spoonacularSourceUrl(spoonacularSourceUrl: string) {
    this._spoonacularSourceUrl = spoonacularSourceUrl;
  }

  get ingredients(): Array<Ingredient> {
    return this._ingredients
  }
  set ingredients(ingredients: Array<Ingredient>) {
    this._ingredients = ingredients;
  }

  get instructions(): Array<Instruction> {
    return this._instructions
  }
  set instructions(instructions: Array<Instruction>) {
    this._instructions = instructions;
  }

  get nutrients(): Array<Nutrient> {
    return this._nutrients
  }
  set nutrients(nutrients: Array<Nutrient>) {
    this._nutrients = nutrients;
  }

  get favorite(): boolean {
    return this._favorite;
  }
  set favorite(favorite: boolean) {
    this._favorite = favorite;
  }

}
