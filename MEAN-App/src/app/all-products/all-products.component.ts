import { Component, OnInit } from '@angular/core';
import { UserService, Product, UserProduct } from '../user.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  userId: string
  productList: any[] = []
  productForm: FormGroup;
  productFormArray: any
  constructor(private userService: UserService,
    private toastr: ToastrService) {
    this.productForm = new FormGroup({
      name: new FormArray([])
    });
    this.productFormArray = <FormArray>this.productForm.controls.name;
    this.userService.getUserName()
      .subscribe(
        data => this.userId = data['_id'],
        error => { }
      )
  }

  onChange(name: string, isChecked: boolean) {
    if (isChecked) {
      this.productFormArray.push(new FormControl(name));
    } else {
      let index = this.productFormArray.controls.findIndex(x => x.value == name)
      this.productFormArray.removeAt(index);
    }
  }

  ngOnInit() {
    this.userService.getAllProducts()
      .subscribe(
        (data: Product[]) => {
          this.productList = data
        },
        error => {
          console.error(error);
        }
      )
  }

  addProduct() {
    let productList: UserProduct[] = [];

    this.productFormArray.value.forEach(element => {
      productList.push({
        name: element,
        user: this.userId
      })
    });

    this.userService.addProduct(productList)
      .subscribe(
        data => {
          this.toastr.success(data['message']);
        },
        error => {
          this.toastr.error(error['error']['message']);
        }
      )
  }

}
