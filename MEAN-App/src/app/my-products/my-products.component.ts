import { Component, OnInit } from '@angular/core';
import { UserService, UserProduct } from '../user.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  productList: UserProduct[] = []
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getUserName()
      .subscribe((user) => {
        this.userService.getMyProducts()
          .subscribe(
            (data: UserProduct[]) => {
              this.productList = data.filter(products => {
                return products['user'] === user['_id'];
              })
            },
            err => console.error(err)
          )
      })
  }
}
