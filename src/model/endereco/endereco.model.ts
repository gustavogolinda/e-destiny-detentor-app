export class Endereco {
    id: Number;
	logradouro: string
	numero: string
	complemento: string
	bairro: string
	cidade: string
	estado: string
	cep: string
    constructor(){
        this.logradouro = '';
        this.numero = '';
        this.complemento = '';
        this.bairro = '';
        this.cidade = '';
        this.estado = '';
        this.cep = '';
    }
}