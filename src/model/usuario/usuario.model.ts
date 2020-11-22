import { Endereco } from "../endereco/endereco.model";

export class User {
    id: Number;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    endereco: Endereco;

    constructor(){
        this.nome = '';
        this.email = '';
        this.senha = '';
        this.telefone = '';
        this.endereco = new Endereco();
    }
}