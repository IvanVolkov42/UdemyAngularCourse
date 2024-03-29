import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../services/recipe.service";
import {Recipe} from "../recipes/recipes.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable({ providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-book-51b12-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe();
  }
  fetchRecipes() {
     return this.http.get<Recipe[]>('https://ng-recipe-book-51b12-default-rtdb.firebaseio.com/recipes.json')
       .pipe(
        map(recipes=> {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  }
}
