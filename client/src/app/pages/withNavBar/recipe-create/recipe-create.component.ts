import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css'],
})
export class RecipeCreateComponent implements OnInit {
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
    private userDataService: UserDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  get ingredients() {
    return this.form.controls['ingredients'] as FormArray;
  }

  newRecipeCreate() {
    if (this.form.valid) {
      this.userDataService.sendNewRecipe(this.form.value);
    }
  }

  addIngredients() {
    const ingredientsForm = this.fb.group({
      ingredient: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required],
    });
    this.ingredients.push(ingredientsForm);
  }
}
