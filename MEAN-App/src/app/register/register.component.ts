import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  successMessage: string = '';
  constructor(private userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, [Validators.required, Validators.pattern(new RegExp("^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"))]),
      cnfpass: new FormControl(null, this.passValidator)
    });
  }

  ngOnInit() {
    this.registerForm.controls.password.valueChanges
      .subscribe(
        x => this.registerForm.controls.cnfpass.updateValueAndValidity()
      );
  }

  isValid(controlName) {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  register() {
    if (this.registerForm.valid) {
      this.userService.submitRegister(this.registerForm.value)
        .subscribe(
          data => this.toastr.success(data['message']),
          error => this.toastr.error(error['error']['message'])
        );
    }
  }

  moveToLogin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }

}
