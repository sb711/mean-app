import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

}
