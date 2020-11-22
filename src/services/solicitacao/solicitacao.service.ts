import { Injectable } from "@angular/core";
import { Solicitacao } from "../../model/solicitacao/solicitacao.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "~/model/usuario/usuario.model";

@Injectable()
export class SolicitacaoService {

    constructor (private http: HttpClient){

    }

    abrirSolicitacao(solicitacao: Solicitacao) {
        let localStorage = require("tns-core-modules/application-settings");
        const baseUrl = 'http://10.0.2.2:8080/solicitacao';
        const body = `{
            "solicitante": {
                "id": ${solicitacao.detentor.id}
            },
            "residuos": ${JSON.stringify(solicitacao.residuos)},
            "situacao": "ABERTA",
            "justificativa": ""
        }`
        console.log('Solicitacao: ' + body);
        const headers = new HttpHeaders()
            .append('Content-type','application/json')
            .append('Authorization',`Bearer ${localStorage.getString('token')}`);
        return this.http.post<Solicitacao>(baseUrl, body , { headers } )
            .toPromise();
    }

    async buscarSolicitacoesPorUsuario(email: string): Promise<any>{
        const baseUrl = `http://10.0.2.2:8080/solicitacao/findAllBySolicitante?email=${email}`;
        let localStorage = require("tns-core-modules/application-settings");
        
        const headers = new HttpHeaders()
            .append('Content-type','application/json')
            .append('Authorization',`Bearer ${localStorage.getString('token')}`);
        return await this.http.get(baseUrl, { headers })
            .toPromise().then(response => {
                console.log(response);
                return response;
              });;
    }
}
