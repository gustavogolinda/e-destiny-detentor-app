import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../../model/usuario/usuario.model";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {

    constructor (private http: HttpClient){

    }

    async register(user: User): Promise<User> {
        
        const baseUrl = 'http://10.0.2.2:8080/detentor/novoDetentor';
        const headers = new HttpHeaders()
            .append('Content-type','application/json');
        // const body = `{
        //     "nome": ${user.nome},
        //     "email": ${user.email},
        //     "senha": ${user.senha},
        //     "telefone": ${user.telefone},
        //     "enderecos": 
        //         {
        //             "logradouro": ${user.enderecos[0].logradouro},
        //             "numero": ${user.enderecos[0].numero},
        //             "complemento": ${user.enderecos[0].complemento},
        //             "bairro": ${user.enderecos[0].bairro},
        //             "cidade": ${user.enderecos[0].cidade},
        //             "estado": ${user.enderecos[0].estado},
        //             "cep": ${user.enderecos[0].cep}
        //         }
        //     }
        // `
        console.log(user);
        return this.http.post<User>(baseUrl ,user, { headers })
            .toPromise();
    }

    async findByEmail(email: string): Promise<any> {
        const baseUrl = 'http://10.0.2.2:8080/detentor?findDetentorByEmail';
        let localStorage = require("tns-core-modules/application-settings");

        let params = new HttpParams();
        params = params.set('email', email)
        
        const headers = new HttpHeaders()
            .append('Content-type','application/json')
            .append('Authorization',`Bearer ${localStorage.getString('token')}`);
        return this.http.get(baseUrl, { headers, params })
            .toPromise();
    }

    removerCaracterEspecial(texto: string): string {
        texto = texto.split('.').join('');
        texto = texto.split('/').join('');
        texto = texto.split('-').join('');
        texto = texto.split('_').join('');
        texto = texto.split('(').join('');
        texto = texto.split(')').join('');
        return texto;
    }

    async resetPassword(email: String): Promise<any> {
        const baseUrl = 'http://10.0.2.2:8080/detentor/recuperarSenha';
        
        const headers = new HttpHeaders()
            .append('Content-type','application/json');
        return await this.http.post(baseUrl, email , { headers } )
            .toPromise();
    }
}
