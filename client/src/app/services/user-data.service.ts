import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  user$ = new BehaviorSubject<any>(null);

  oneRecipe$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getUserData() {
    this.http.get<any>(`${environment.baseAPI}/user/get-user-data`).subscribe({
      next: (result: any) => {
        this.user$.next(result);
      },
      error: (e) => {
        console.log(e.error.message);
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
        next: (result: any) => {},
        error: (e) => {
          console.log(e.error.message);
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
          console.log(e.error.message);
        },
      });
  }
}
