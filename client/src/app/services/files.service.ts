import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
}
