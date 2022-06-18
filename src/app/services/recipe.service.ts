import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "../recipes/recipes.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Array<Recipe> = [
    new Recipe('Shnitzel',
      'Tasty',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
       [
         new Ingredient('Meat', 1),
         new Ingredient( 'Spices', 10)
       ]),
    new Recipe('Burger',
      'Not so tasty',
      'https://kbr.com.pk/wp-content/uploads/2020/08/burger-600x371.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient( 'Meat', 1),
        new Ingredient( 'Tomato', 1),
        new Ingredient( 'Grass', 3),
        new Ingredient( 'Cheese', 2),

      ]),
  ];

  constructor(private slService: ShoppingListService) {
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
}
