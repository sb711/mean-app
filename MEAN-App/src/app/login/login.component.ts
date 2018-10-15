import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value)
        .subscribe(
          data => {
            this.toastr.success(data['message']);
            localStorage.setItem('token', data['token']);
            this._router.navigate(['/dash']);
          },
          error => {
            this.toastr.error(error['error']['message']);
          }
        );
    }
  }

  moveToRegister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }

}
