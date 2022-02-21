import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FilesService } from 'src/app/services/files.service';

import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    private: new FormControl(true, [Validators.required]),
    ingredients: this.fb.array([]),
    recipeImages: this.fb.array([]),
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
    private fb: FormBuilder,
    private fileService: FilesService
  ) {}

  oneRecipe$ = this.userDataService.oneRecipe$;
  recipeImages$ = this.fileService.recipeImages$;

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

        if (this.recipeImages.length === 0) {
          oneRecipe.recipeImages.forEach((image: any) => {
            const recipeImagesForm = this.fb.group({
              imageURL: [image.imageURL, Validators.required],
            });
            this.recipeImages.push(recipeImagesForm);
          });
        }

        this.form.patchValue({
          name: oneRecipe.name,
          description: oneRecipe.description,
          private: true ? oneRecipe.private === 'true' : false,
        });
      }
    });

    this.recipeImages$.subscribe((recipeImages: any) => {
      if (recipeImages) {
        recipeImages.forEach((image: any) => {
          const recipeImagesForm = this.fb.group({
            imageURL: [image, Validators.required],
          });
          this.recipeImages.push(recipeImagesForm);
        });
      }
    });
  }

  get ingredients() {
    return this.form.controls['ingredients'] as FormArray;
  }

  get recipeImages() {
    return this.form.controls['recipeImages'] as FormArray;
  }

  edit() {
    if (this.form.valid) {
      this.userDataService.recipeEdit(
        this.form.value,
        this.route.snapshot.params['id']
      );
    }
  }
  ingredientDelete(i: any) {
    this.ingredients.removeAt(i);
  }

  imageDelete(i: any) {
    this.recipeImages.removeAt(i);
  }

  uploadMultiple(event: any) {
    const files = event.target.files;
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('files', element);
    }

    this.fileService.sendFiles(formData);
  }

  addIngredients() {
    const ingredientsForm = this.fb.group({
      ingredient: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required],
    });
    this.ingredients.push(ingredientsForm);
    console.log(this.form);
  }

  ngOnDestroy() {
    this.fileService.recipeImageReset();
    this.oneRecipe$.next(null);
  }
}
