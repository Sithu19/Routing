import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('A test Recipe',
  //   'This is a test',
  //   'https://www.eatwell101.com/wp-content/uploads/2019/08/tuscan-salmon-recipe.jpg',
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('French Fries', 3)
  //   ]),
  //   new Recipe('A test Recipe',
  //    'This is a test',
  //     'https://www.eatwell101.com/wp-content/uploads/2019/08/tuscan-salmon-recipe.jpg',
  //      [
  //        new Ingredient('Buns', 2),
  //        new Ingredient('Meat', 5)
  //      ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService){

  }

  setRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipe(){
    return this.recipes.slice();
  }

  getRecipes(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
