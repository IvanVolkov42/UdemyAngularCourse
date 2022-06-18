import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Array<Ingredient> | undefined;

  constructor( name: string, descripton: string, imagePath: string, ingredients?: Array<Ingredient>) {
    this.name = name;
    this.description = descripton;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
