import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  token: any
  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService) {
    this.token = this.activatedRoute.snapshot.params.token;
  }

  ngOnInit() {
  }

  activate() {
    this.userService.activate(this.token)
      .subscribe(
        data => {
          this.toastr.success(data['message']);
          setTimeout(() => {
            this.route.navigate(['/login'])
          }, 2000);
        },
        error => {
          this.toastr.error(error['error']['message']);
        }
      )
  }

}
