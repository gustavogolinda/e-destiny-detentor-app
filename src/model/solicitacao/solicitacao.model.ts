import { Residuo } from "../residuo/residuo.model";
import { User } from "../usuario/usuario.model";

export class Solicitacao {
    id: Number;
    detentor: User;
    residuos: Residuo[];
    situacao: String;
    justificativa: String;
    dtSolicitacao: Date;

    constructor(){
        this.id = 0;
        this.detentor = new User;
        this.residuos = [];
        this.situacao = '';
        this.justificativa = '';
    }
}