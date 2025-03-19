import { Cliente } from "./Cliente";
import { Produto } from "./Produto";

export class PrecoExcluisvo {
    id?: string;
    preco?: string;
    produto?: Produto; //esta relacionado a um produto o preco exclusivo
    cliente?: Cliente; //esta relacionado a um produto o preco exclusivo
}