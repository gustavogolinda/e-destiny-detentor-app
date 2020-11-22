import { Categoria } from "../categoria/categoria.model";

export class Residuo {
    id: number;
    descricao: String;
    unidadeMedida: number;
    categoria: Categoria;
    quantidade: number;

    constructor(){
        this.id = 0;
        this.descricao = '';
        this.categoria = new Categoria;
    }
}