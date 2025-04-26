import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProdutosResponse } from '../../Models/ProdutosResponse';



@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private http: HttpClient) { }

  obterProdutos(pageNumber: number, pageSize: number): Observable<ProdutosResponse> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };
    
    return this.http.get<ProdutosResponse>(`${environment.DOMINIO}/${environment.ENDPOINT_ESTOQUE}`,
      { params }
    );
  }
}
