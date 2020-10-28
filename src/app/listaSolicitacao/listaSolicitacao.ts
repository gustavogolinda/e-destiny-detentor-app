import { Solicitacao } from "../../model/solicitacao/solicitacao.model";

export class listaDeSolicitacao {
    solicitacao: Solicitacao[];

    constructor(){
        this.solicitacao = [{ id: 1, justificativa: 'teste', usuario: { 
            id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
            senha: 'testcomplete', confirmaSenha: 'testcomplete', telefone: '99999999'}, situacao: 'Aberta', 
            residuos: [
                { id: 1, descricao: 'Placa arduino', unidadeMedida: 'UN', quantidade: 2, categoria: 'Placas'}] 
        },
        { id: 2, justificativa: 'Teste celular', usuario: { 
            id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
            senha: 'testcomplete', confirmaSenha: 'testcomplete', telefone: '99999999'}, situacao: 'Aberta', 
            residuos: [
                { id: 2, descricao: 'Celular', unidadeMedida: 'UN', quantidade: 1, categoria: 'Aparelhos eletrônicos'}] 
        },
        { id: 3, justificativa: 'Teste monitor quebrado', usuario: { 
            id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
            senha: 'testcomplete', confirmaSenha: 'testcomplete', telefone: '99999999'}, situacao: 'Aberta', 
            residuos: [
                { id: 3, descricao: 'Monitor philips quebrado', unidadeMedida: 'UN', quantidade: 1, categoria: 'Visores'}] 
        },
        { id: 4, justificativa: 'Teste pilhas', usuario: { 
            id: 1, nome: 'Gustavo Gonçalves', email: 'gustavogolinda@dummy.com.br', 
            senha: 'testcomplete', confirmaSenha: 'testcomplete', telefone: '99999999'}, situacao: 'Aberta', 
            residuos: [
                { id: 4, descricao: 'Pilhas velhas', unidadeMedida: 'KG', quantidade: 1.5, categoria: 'Resíduo pilha'}] 
        }]
    }
    
}