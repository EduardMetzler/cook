import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  user$ = new BehaviorSubject<any>({});

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
}