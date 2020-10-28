export class Residuo {
    id: number;
    descricao: String;
    unidadeMedida: String;
    categoria: String;
    quantidade: number;

    constructor(){
        this.id = 0;
        this.descricao = '';
        this.unidadeMedida = '';
        this.categoria = '';
        this.quantidade = 0;
    }
}