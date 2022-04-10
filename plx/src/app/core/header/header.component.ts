import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }
  
  get sessionUser() {
    return this.userService.sessionUser;
  }

  logout(): void {
    this.userService.clearUserData();
  }

}
