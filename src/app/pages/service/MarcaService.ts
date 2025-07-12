import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MarcaResponse } from '../../Models/Dtos/MarcasResponse';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }


  /** Retorna todas as marcas (GET /marcas) */
  getMarcas(): Observable<MarcaResponse> {
    return this.http.get<MarcaResponse>(`${environment.DOMINIO_API_CMR}/${environment.ENDPOINT_MARCAS}`);
  }
}
