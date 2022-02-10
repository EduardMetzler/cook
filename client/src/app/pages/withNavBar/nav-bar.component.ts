import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private userDataService: UserDataService) {}

  user$ = this.userDataService.user$;

  ngOnInit(): void {
    this.userDataService.getUserData();
  }
}
