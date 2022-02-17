import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private fileService: FilesService) {}

  ngOnInit(): void {}

  upload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.fileService.sendFile(formData);
  }
}
