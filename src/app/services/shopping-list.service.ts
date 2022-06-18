import { EventEmitter } from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Array<Ingredient>>();
  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 2),
    new Ingredient('Banana', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient (ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Array<Ingredient> | undefined){
    // @ts-ignore
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
