import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
})
export class MyRecipesComponent implements OnInit {
  constructor(private userDataService: UserDataService) {}

  user$ = this.userDataService.user$;

  ngOnInit(): void {}

  recipeDelete(id: any) {
    this.userDataService.oneRecipeDelete(id);
  }
}
