import { Solicitacao } from "../../model/solicitacao/solicitacao.model";

export class listaDeSolicitacao {
    solicitacao: Solicitacao[];

    constructor(){
        // this.solicitacao = [{ id: 1, justificativa: 'teste', detentor: { 
        //     id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
        //     senha: 'testcomplete',  telefone: '99999999', enderecos: []}, situacao: 'Aberta', 
        //     residuos: [
        //         { id: 1, descricao: 'Placa arduino', unidadeMedida: 0, quantidade: 2, categoria: { id: 1,descricao: 'UN', ativo: true}}] 
        // },
        // { id: 2, justificativa: 'Teste celular', detentor: { 
        //     id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
        //     senha: 'testcomplete',  telefone: '99999999', enderecos: []}, situacao: 'Aberta', 
        //     residuos: [
        //         { id: 2, descricao: 'Celular', unidadeMedida: 0, quantidade: 1, categoria: { id: 1,descricao: 'UN', ativo: true}}] 
        // },
        // { id: 3, justificativa: 'Teste monitor quebrado', detentor: { 
        //     id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
        //     senha: 'testcomplete',  telefone: '99999999', enderecos: []}, situacao: 'Aberta', 
        //     residuos: [
        //         { id: 3, descricao: 'Monitor philips quebrado', unidadeMedida: 0, quantidade: 1, categoria: { id: 1,descricao: 'UN', ativo: true}}] 
        // },
        // { id: 4, justificativa: 'Teste pilhas', detentor: { 
        //     id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
        //     senha: 'testcomplete',  telefone: '99999999', enderecos: []}, situacao: 'Aberta', 
        //     residuos: [
        //         { id: 4, descricao: 'Pilhas velhas', unidadeMedida: 0, quantidade: 1.5, categoria: { id: 1,descricao: 'UN', ativo: true}}] 
        // }]
    }
    
}