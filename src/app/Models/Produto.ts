import { Categoria } from "./Categoria";
import { Custo } from "./Custo";
import { Marca } from "./Marca";
import { Preco } from "./Preco";

export class Produto {
    id?: string;
    code?: string;
    nome?: string;
    descricao?: string;
    quantidade?: number;
    statusEstoque?: string;
    categoria?: Categoria;
    imagem?: string;
    avaliacao?: number;
    marca?: Marca;
    custos?: Custo[];
    preco?: Preco[];

    constructor(
        id?: string,
        code?: string,
        nome?: string,
        descricao?: string,
        quantidade?: number,
        statusEstoque?: string,
        categoria?: Categoria,
        imagem?: string,
        avaliacao?: number,
        marca?: Marca,
        custos?: Custo[],
        precos?: Preco[]
    ) {
        this.id = id;
        this.code = code;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.statusEstoque = statusEstoque;
        this.categoria = categoria;
        this.imagem = imagem;
        this.avaliacao = avaliacao;
        this.marca = marca;
        this.custos = custos;
        this.preco = precos;
    }
}



