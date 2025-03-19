import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

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
    marca?: Marca;
}



