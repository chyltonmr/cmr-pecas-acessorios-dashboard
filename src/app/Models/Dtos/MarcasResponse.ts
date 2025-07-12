import { Marca } from "../ProdutosResponse"; 



    //Interface da resposta paginada:
  export interface MarcaResponse {
    listObjetos: Marca[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }