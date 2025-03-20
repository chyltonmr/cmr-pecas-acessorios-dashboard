import { Categoria } from "./Categoria";
import { Custo } from "./Custo";
import { Marca } from "./Marca";
import { Preco } from "./Preco";

export interface Produto {
    id?: string;
    code?: string;
    nome?: string;
    descricao?: string;
    quantidade?: number;
    statusEstoque?: string;
    categoria?: Categoria;
    imagem?: string;
    avaliacao?: number;
    marca?: string;
    custos?: string;
    liquidoPf?: Number;
    liquidoPj?: Number;
    margemPf?: Number;
    margemPj?: Number;
    precoPf?: Number;
    precoPj?: Number;
}