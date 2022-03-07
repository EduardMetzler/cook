import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilesService } from 'src/app/services/files.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  myRecipeAmount = 0;

  user$ = this.userDataService.user$.pipe(
    map((userData) => {
      this.myRecipeAmount = userData.recipesArray.length;
      return userData;
    })
  );

  constructor(
    private fileService: FilesService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {}

  upload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.fileService.sendFile(formData);
  }
}
