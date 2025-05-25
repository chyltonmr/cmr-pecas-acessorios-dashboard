import { Categoria } from "../ProdutosResponse";




//Interface da resposta paginada:
  export interface CategoriaResponse {
    listObjetos: Categoria[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }