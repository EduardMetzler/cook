import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FilesService } from 'src/app/services/files.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css'],
})
export class RecipeCreateComponent implements OnInit, OnDestroy {
  recipeImages$ = this.fileService.recipeImages$;

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
    private userDataService: UserDataService,
    private fb: FormBuilder,
    private fileService: FilesService
  ) {}

  ngOnInit(): void {
    this.recipeImages$.subscribe((recipeImages: any) => {
      if (recipeImages) {
        recipeImages.forEach((image: any) => {
          const recipeImagesForm = this.fb.group({
            imageURL: [image, Validators.required],
          });
          this.recipeImages.push(recipeImagesForm);
          console.log(this.form);
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
    console.log(this.form);
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

  ngOnDestroy() {
    this.fileService.recipeImageReset();
  }
}
