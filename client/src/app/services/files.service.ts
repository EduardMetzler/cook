import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snacBar: MatSnackBar,
    private userDataService: UserDataService
  ) {}

  recipeImages$ = new BehaviorSubject<any>(null);

  openSnacBar(message: any) {
    this.snacBar.open(message);
  }

  sendFile(file: any) {
    this.http.post<any>(`${environment.baseAPI}/files/file`, file).subscribe({
      next: (result: any) => {
        this.userDataService.getUserData();
        this.openSnacBar(result.message);
      },
      error: (e) => {
        this.openSnacBar(e.error.message);
      },
    });
  }

  sendFiles(files: any) {
    this.http
      .post<any>(`${environment.baseAPI}/files/multifiles`, files)
      .subscribe({
        next: (result: any) => {
          this.userDataService.getUserData();
          this.recipeImages$.next(result);
        },
        error: (e) => {
          this.openSnacBar(e.error.message);
        },
      });
  }

  recipeImageReset() {
    this.recipeImages$.next(null);
  }
}
