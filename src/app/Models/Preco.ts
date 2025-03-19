import { MargemLucro } from "./Dtos/MargemLucro";
import { Produto } from "./Produto";

export class Preco {
    id?: string;
    codProduto?: string
    precoPj?: number;
    precoPf?: number;
    produto?: Produto;
    ativo: boolean = false;
    margemLucro?: MargemLucro;
}