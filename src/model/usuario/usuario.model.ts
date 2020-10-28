export class User {
    id: Number;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    confirmaSenha: string;

    constructor(){
        this.id = 0;
        this.nome = '';
        this.email = '';
        this.senha = '';
        this.telefone = '';
        this.confirmaSenha = '';
    }
}