import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private http: HttpClient) { }

  obterProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.DOMINIO}/${environment.ENDPOINT_ESTOQUE}`);
  }
}
