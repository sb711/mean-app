import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Product {
  _id: string,
  name: string
}

export interface UserProduct {
  _id?: string,
  name: string,
  user: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  submitRegister(body: any) {
    return this._http.post('http://localhost:3000/users/register', body, {
      observe: 'body'
    });
  }

  login(body: any) {
    return this._http.post('http://localhost:3000/users/login', body, {
      observe: 'body'
    });
  }

  getUserName() {
    return this._http.get('http://localhost:3000/users/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  activate(token) {
    return this._http.put('http://localhost:3000/users/activate/' + token, {
      observe: 'body'
    });
  }

  getAllProducts() {
    return this._http.get('http://localhost:3000/products', {
      observe: 'body'
    });
  }

  addProduct(body) {
    return this._http.post('http://localhost:3000/products/add', body, {
      observe: 'body'
    });
  }

  getMyProducts() {
    return this._http.get('http://localhost:3000/products/myProducts', {
      observe: 'body'
    });
  }
}
