import { Categoria } from "./Categoria";
import { Marca } from "./Marca";
import { Preco } from "./Preco";

export interface Produto {
    id?: string;
    code?: string;
    nome?: string;
    descricao?: string;
    preco?: Preco;
    quantidade?: number;
    statusEstoque?: string;
    categoria?: Categoria;
    imagem?: string;
    avaliacao?: number;
    marca?: Marca;
}



