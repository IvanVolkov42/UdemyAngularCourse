import {Injectable} from "@angular/core";
import {Recipe} from "../recipes/recipes.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Array<Recipe> = [
  //   new Recipe('Shnitzel',
  //     'Tasty',
  //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
  //      [
  //        new Ingredient('Meat', 1),
  //        new Ingredient( 'Spices', 10)
  //      ]),
  //   new Recipe('Burger',
  //     'Not so tasty',
  //     'https://cdn.pixabay.com/photo/2020/02/08/09/05/burger-4829526_1280.jpg',
  //     [
  //       new Ingredient('Bread', 2),
  //       new Ingredient( 'Meat', 1),
  //       new Ingredient( 'Tomato', 1),
  //       new Ingredient( 'Grass', 3),
  //       new Ingredient( 'Cheese', 2),
  //
  //     ]),
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService) {
  }

  setRecipes( recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addIngredientToShoppingList(ingredients: Array<Ingredient> | undefined){
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe( index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe (index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
