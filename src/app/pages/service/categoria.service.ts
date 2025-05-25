import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoriaResponse } from '../../Models/Dtos/CategoriasResponse';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }


  /** Retorna todas as categorias (GET /categorias) */
  getCategorias(): Observable<CategoriaResponse> {
    return this.http.get<CategoriaResponse>(`${environment.DOMINIO_API_CMR}/${environment.ENDPOINT_CATEGORIAS}`);
  }
}
