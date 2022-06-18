import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef | undefined;
  @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef | undefined;

  constructor(
    private slService: ShoppingListService
  ) { }

  ngOnInit(): void {
  }

  onAddItem() {
  const newIngredient = new Ingredient( this.nameInputRef?.nativeElement.value, this.amountInputRef?.nativeElement.value);
  this.slService.addIngredient(newIngredient);
  }
}
