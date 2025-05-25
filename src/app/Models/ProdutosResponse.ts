// import { Categoria } from "./Categoria";
// import { Custo } from "./Custo";
// import { Marca } from "./Marca";
// import { Preco } from "./Preco";

export interface Categoria {
    id: string;
    nome: string;
    data_insercao: string;
    data_desativacao: string | null;
  }
  
  export interface Marca {
    id: string;
    nome: string;
    data_insercao: string;
    data_desativacao: string | null;
  }
  
  export interface TipoPreco {
    id: string;
    nome: string;
    descricao: string;
    data_insercao: string;
    data_desativacao: string;
  }
  
  export interface MargemLucro {
    id: string;
    porcentagem_pj: number;
    porcentagem_pf: number;
    valor_liquido_pj: number;
    valor_liquido_pf: number;
    id_preco: string;
    data_insercao: string;
    data_desativacao: string;
  }
  
  export interface Precos {
    id: string;
    id_produto: string;
    id_tipo_preco: string;
    preco_pj: number;
    preco_pf: number;
    data_insercao: string;
    data_desativacao: string | null;
    observacao: string;
    tipoPreco: TipoPreco;
    margemLucro: MargemLucro;
  }
  
  export interface Custo {
    id: string;
    id_produto: string;
    nome: string;
    descricao: string;
    custo: number;
    data_insercao: string;
    data_desativacao: string;
  }
  
  export class Produto {
      id: string = '';
    nome: string = '';
    imagem_thumbnail: string = '';
    descricao: string = '';
    estoque: number = 0;
    id_categoria: string = '';
    id_marca: string = '';
    data_insercao: string = '';
    data_desativacao: string | null = null;
    categoria: Categoria = {} as Categoria;
    marca: Marca = {} as Marca;
    precos: Precos = {} as Precos;
    custo: Custo = {} as Custo;
  }
  
  // Interface da resposta paginada:
  export interface ProdutosResponse {
    listObjetos: Produto[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }
  