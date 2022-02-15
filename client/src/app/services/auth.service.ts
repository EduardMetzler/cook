import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userDataService: UserDataService,
    private snacBar: MatSnackBar
  ) {}

  login(data: any) {
    this.http.post<any>(`${environment.baseAPI}/login`, data).subscribe({
      next: (result: any) => {
        localStorage.setItem('token', result.token);
        this.router.navigate(['']);
        this.userDataService.getUserData();
        this.openSnacBar(result.message);
      },
      error: (e) => {
        console.log(e.error.message);
        this.openSnacBar(e.error.message);
      },
    });
  }

  register(data: any) {
    this.http.post<any>(`${environment.baseAPI}/register`, data).subscribe({
      next: (result: any) => {
        localStorage.setItem('token', result.token);
        this.router.navigate(['']);
      },
      error: (e) => {
        console.log(e.error.message);
        this.openSnacBar(e.error.message);
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.userDataService.deleteUserData();
  }

  openSnacBar(message: any) {
    this.snacBar.open(message);
  }
}
