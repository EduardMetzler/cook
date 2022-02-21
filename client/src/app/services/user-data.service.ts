import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  user$ = new BehaviorSubject<any>(null);

  oneRecipe$ = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private snacBar: MatSnackBar
  ) {}

  openSnacBar(message: any) {
    this.snacBar.open(message);
  }

  getUserData() {
    this.http.get<any>(`${environment.baseAPI}/user/get-user-data`).subscribe({
      next: (result: any) => {
        this.user$.next(result);
      },
      error: (e) => {
        console.log(e.error.message);
        this.openSnacBar(e.error.message);
      },
    });
  }

  deleteUserData() {
    this.user$.next(null);
  }

  sendNewRecipe(form: any) {
    console.log(form);
    this.http
      .post<any>(`${environment.baseAPI}/user/new-recipe-create`, form)
      .subscribe({
        next: (result: any) => {
          this.getUserData();
          this.openSnacBar(result.message);
        },
        error: (e) => {
          console.log(e.error.message);
          this.openSnacBar(e.error.message);
        },
      });
  }

  getOneRecipe(id: any) {
    this.http
      .get<any>(`${environment.baseAPI}/user/one-recipe/${id}`)
      .subscribe({
        next: (result: any) => {
          this.oneRecipe$.next(result);
        },
        error: (e) => {
          if (e.error.message === 'Recipe is private') {
            this.router.navigate(['home']);
          }

          console.log(e.error.message);
          this.openSnacBar(e.error.message);
        },
      });
  }

  oneRecipeDelete(id: any) {
    this.http
      .delete<any>(`${environment.baseAPI}/user/one-recipe-delete/${id}`)
      .subscribe({
        next: (result: any) => {
          this.getUserData();
          console.log(result);
          this.openSnacBar(result.message);
        },
        error: (e) => {
          console.log(e.error.message);
          this.openSnacBar(e.error.message);
        },
      });
  }

  recipeEdit(form: any, id: any) {
    this.http
      .put<any>(`${environment.baseAPI}/user/one-recipe-update/${id}`, form)
      .subscribe({
        next: (result: any) => {
          this.getUserData();
          this.openSnacBar(result.message);
        },
        error: (e) => {
          console.log(e.error.message);
          this.openSnacBar(e.error.message);
        },
      });
  }

  oneRecipeReset() {
    this.oneRecipe$.next(null);
  }
}
