import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  username = '';
  constructor(private userService: UserService, private _router: Router) {
    this.userService.getUserName()
      .subscribe(
        data => this.username = data['firstname'],
        error => {}
      )
  }

  ngOnInit() {
  }

}
