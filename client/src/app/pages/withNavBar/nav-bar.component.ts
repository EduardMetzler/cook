import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private userDataService: UserDataService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  user$ = this.userDataService.user$;

  ngOnInit(): void {
    this.userDataService.getUserData();
  }

  logoutProces() {
    this.authService.logout();
  }
  toLogin() {
    this.router.navigate(['login']);
  }

  toRegister() {
    this.router.navigate(['register']);
  }
}
