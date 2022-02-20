// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// HTTP
import { HttpClient } from '@angular/common/http';

// Models
import { ServerResponse } from '../models/server-response.model';
import { Grocery } from '../models/grocery.model';

const domain = 'http://localhost:8000';
const getSingleGroceryEndpoint = domain + '/grocery/details/';
const createGroceryEndpoint = domain + '/grocery/add';
const editGroceryEndpoint = domain + '/grocery/edit/';
const deleteGroceryEndpoint = domain + '/grocery/delete/';
const rateGroceryEndpoint = domain + '/grocery/rate/';
const addToFavoritesEndpoint = domain + '/grocery/addToFavorites/';
const searchGroceryEndpoint = domain + '/grocery/search';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  constructor(private http: HttpClient) { }

  getSingleGrocery(id: string): Observable<ServerResponse<Grocery>> {
    console.log(this.http.get<ServerResponse<Grocery>>(getSingleGroceryEndpoint + id))
    return this.http.get<ServerResponse<Grocery>>(getSingleGroceryEndpoint + id);
   
  }

  createGrocery(payload: Grocery): Observable<ServerResponse<Grocery>> {
    return this.http.post<ServerResponse<Grocery>>(createGroceryEndpoint, payload);
  }

  editGrocery(id: string, payload: Grocery): Observable<ServerResponse<Grocery>> {
    return this.http.put<ServerResponse<Grocery>>(editGroceryEndpoint + id, payload);
  }

  deleteGrocery(id: string): Observable<ServerResponse<Grocery>> {
    return this.http.delete<ServerResponse<Grocery>>(deleteGroceryEndpoint + id);
  }

  rateGrocery(id: string, payload: object): Observable<ServerResponse<Grocery>> {
    return this.http.post<ServerResponse<Grocery>>(rateGroceryEndpoint + id, payload);
  }

  addToFavourites(id: string): Observable<ServerResponse<Grocery>> {
    return this.http.post<ServerResponse<Grocery>>(addToFavoritesEndpoint + id, {});
  }

  search(query: string): Observable<ServerResponse<Grocery[]>> {
    return this.http.get<ServerResponse<Grocery[]>>(searchGroceryEndpoint + query);
  }
}
