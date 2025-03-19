import { Produto } from "./Produto";

export class Preco {
    id?: string;
    precoPj?: number;
    precoPf?: number;
    produto?: Produto;
    ativo: boolean = false;
}