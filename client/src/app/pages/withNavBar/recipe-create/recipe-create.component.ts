import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css'],
})
export class RecipeCreateComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    private: new FormControl(true, [Validators.required]),
  });

  options = [
    { lable: 'True', value: true },
    { lable: 'False', value: false },
  ];
  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {}

  newRecipeCreate() {
    if (this.form.valid) {
      this.userDataService.sendNewRecipe(this.form.value);
    }
  }
}
