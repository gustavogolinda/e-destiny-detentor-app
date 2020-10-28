import { Residuo } from "../residuo/residuo.model";
import { User } from "../usuario/usuario.model";

export class Solicitacao {
    id: Number;
    usuario: User;
    residuos: Residuo[];
    situacao: String;
    justificativa: String;

    constructor(){
        this.id = 0;
        this.usuario = new User;
        this.residuos = [];
        this.situacao = '';
        this.justificativa = '';
    }
}