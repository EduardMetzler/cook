import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  oneRecipe$ = this.userDataService.oneRecipe$;

  ngOnInit(): void {
    //  const id= this.route.paramMap.subscribe((params: any) => {
    //     params.get('id');
    //   });
    this.userDataService.getOneRecipe(this.route.snapshot.params['id']);
  }
}
