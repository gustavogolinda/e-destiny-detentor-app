import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData, Page } from "tns-core-modules/ui/page";
import { Solicitacao } from "../../model/solicitacao/solicitacao.model";
import { Residuo } from "../../model/residuo/residuo.model";
import { Utils } from "../utils/utils";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
    selector: "novaSolicitacao",
    templateUrl: "./novaSolicitacao.component.html",
    styleUrls: ['../login/login.component.css', "./novaSolicitacao.component.css"]
})

export class NovaSolicitacaoComponent implements OnInit {
    public drawer: RadSideDrawer;
    solicitacao: Solicitacao;
    residuo: Residuo;
    utils: Utils;
    unidadesMedida = ['UN', 'KG'];
    constructor(private routerExtensions: RouterExtensions, private page: Page) {
        // this.page.actionBarHidden = true;
        this.utils = new Utils();
        this.residuo = new Residuo();
        this.solicitacao = new Solicitacao();
    }

    ngOnInit(): void {
        
    }

    submit() {
        // let solicitacao = new Solicitacao(this.residuo);
        // listaDeSolicitacao.push(this.solicitacao);
        this.utils.confirm("Solicitação aberta com sucesso!");
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }


    RetornarAoMenu(){
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.drawer = <RadSideDrawer>app.getRootView();
            this.drawer.gesturesEnabled = false;
        },100);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    addMaterial(){
        if (!(this.residuo.quantidade > 0) || !(this.residuo.unidadeMedida) || !(this.residuo.descricao)){
            this.utils.alert("Atenção! É necessário preencher todos os campos antes de adicionar um resíduo!");
            return;
        }
        this.solicitacao.residuos.push(this.residuo);
        console.log(this.solicitacao);
    }

    onChange(args: SelectedIndexChangedEventData){
        this.residuo.unidadeMedida = this.unidadesMedida[args.newIndex];
    }
}
