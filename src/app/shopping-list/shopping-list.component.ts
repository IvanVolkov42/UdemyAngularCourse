import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Array<Ingredient> | undefined;
  private ingSub: Subscription | undefined;
  constructor( private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Array<Ingredient>) => {
        this.ingredients = ingredients;
      }
    );
  }
  onEditItem( index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.ingSub?.unsubscribe();
  }
}
