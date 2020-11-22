import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(
    private http: HttpClient
  ) { }


    async consultaEnderecoViaCep(cep: string): Promise<any> {
        console.log(`https://viacep.com.br/ws/${cep}/json/`);
        return await this.http.get(`http://viacep.com.br/ws/${cep}/json/`).toPromise();
    }
}