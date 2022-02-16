import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  form = this.fb.group({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    private: new FormControl(true, [Validators.required]),
    ingredients: this.fb.array([]),
  });
  options = [
    { lable: 'True', value: true },
    { lable: 'False', value: false },
  ];

  unitList = {
    grams: 'g',
    item: 'item',
    milliliter: 'ml',
    kilogram: 'kg',
  };
  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private fb: FormBuilder
  ) {}

  oneRecipe$ = this.userDataService.oneRecipe$;

  ngOnInit(): void {
    this.userDataService.getOneRecipe(this.route.snapshot.params['id']);

    this.oneRecipe$.subscribe((oneRecipe: any) => {
      if (oneRecipe) {
        if (this.ingredients.length === 0) {
          oneRecipe.ingredients.forEach((ingredient: any) => {
            const ingredientsForm = this.fb.group({
              ingredient: [ingredient.ingredient, Validators.required],
              amount: [ingredient.amount, Validators.required],
              unit: [ingredient.unit, Validators.required],
            });
            this.ingredients.push(ingredientsForm);
          });
        }

        this.form.patchValue({
          name: oneRecipe.name,
          description: oneRecipe.description,
          private: true ? oneRecipe.private === 'true' : false,
          // ingredients: oneRecipe.ingredients,
        });
      }
    });
  }

  get ingredients() {
    return this.form.controls['ingredients'] as FormArray;
  }

  edit() {
    if (this.form.valid) {
      this.userDataService.recipeEdit(
        this.form.value,
        this.route.snapshot.params['id']
      );
    }
  }
}
