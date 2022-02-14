import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  oneRecipe$ = this.userDataService.oneRecipe$;

  ngOnInit(): void {
    this.userDataService.getOneRecipe(this.route.snapshot.params['id']);

    this.oneRecipe$.subscribe((oneRecipe: any) => {
      if (oneRecipe) {
        this.form.patchValue({
          name: oneRecipe.name,
          description: oneRecipe.description,
        });
      }
    });
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
