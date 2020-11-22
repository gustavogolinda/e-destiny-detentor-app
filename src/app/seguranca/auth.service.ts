import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://10.0.2.2:8080/oauth/token';
  jwtPayload: any;

  tokensRevokeUrl = 'http://10.0.2.2:8080/tokens/revoke';
  localStorage = require("tns-core-modules/application-settings");

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      // tslint:disable-next-line: align
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `client=angular&username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        // tslint:disable-next-line: no-string-literal
        this.armazenarToken(response['access_token']);
        console.log(this.localStorage.getString('token'));
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();

          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuario ou senha invalidos !');
          }
        }
        return Promise.reject(response);
        // console.log(response);
      });
  }

  
  isAccessTokenInvalido() {
    const token = this.localStorage.getString('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  
  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    this.localStorage.setString('token', token);
  }

  
  private carregarToken() {
    const token = this.localStorage.getString('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  
  limparAcessoToken() {
    console.log('esse');
    this.localStorage.clear();
    this.jwtPayload = null;
  }

  
  logout() {
    const headers = new HttpHeaders()
            .append('Authorization',`Bearer ${this.localStorage.getString('token')}`);
    return this.http.delete(this.tokensRevokeUrl, { headers, withCredentials: true })
      .toPromise()
      .then(() => {
        this.limparAcessoToken();
      });
  }

  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
}