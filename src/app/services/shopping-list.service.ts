import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Array<Ingredient>>();
  startedEditing = new Subject<number>();
  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 2),
    new Ingredient('Banana', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index:number) {
    return this.ingredients[index];
  }
  addIngredient (ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Array<Ingredient> | undefined){
    // @ts-ignore
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number | undefined, newIngredient: Ingredient | undefined) {
    // @ts-ignore
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient( index: number) {
    this.ingredients.splice( index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
