import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipe/recipe.model";
import { RecipeService } from "../recipe/recipe.service";
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService{

  constructor(private http: HttpClient, private recipeService: RecipeService){

  }

  storeRecipes(){
    const recipes = this.recipeService.getRecipe();
    this.http.put('https://angular-81361.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);

    })
  }

  fetchRecipe(){
    return this.http.get<Recipe[]>('https://angular-81361.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return{...recipe, ingredients: recipe.ingredients? recipe.ingredients: []}
      })
    }),
    tap(recipes => {
      this.recipeService.setRecipe(recipes);
    })
    )
  }

}
