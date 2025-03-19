import { Categoria } from "./Categoria";

export interface Produto {
    id?: string;
    code?: string;
    nome?: string;
    descricao?: string;
    preco?: number;
    quantidade?: number;
    statusEstoque?: string;
    categoria?: Categoria;
    imagem?: string;
    avaliacao?: number;
}



