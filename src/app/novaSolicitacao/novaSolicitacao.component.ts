import { Component, OnInit, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Solicitacao } from "../solicitacao/solicitacao.model";
import { confirm } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "novaSolicitacao",
    templateUrl: "./novaSolicitacao.component.html",
    styleUrls: ['../login/login.component.css']
})

export class NovaSolicitacaoComponent implements OnInit {

    public drawer: RadSideDrawer;
    solicitacao: Solicitacao;
    //     { "tipoMaterial": "Parte de computador", "material": "Placa-mãe", "quantidade": 1 },
    //     { "tipoMaterial": "Parte de celular", "material": "Celular inteiro", "quantidade": 1 },
    //     { "tipoMaterial": "Parte de computador", "material": "Memória RAM", "quantidade": 4 }
    // ];
    constructor(private routerExtensions: RouterExtensions, private page: Page) {
        // this.page.actionBarHidden = true;
        this.solicitacao = new Solicitacao;
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        
        // Init your component properties here.
    }

    confirm(message: string){
        return confirm({
            title: "e-Destiny",
            okButtonText: "OK",
            message: message
        })
    }

    submit() {
        let listaDeSolicitacao = require('../listaSolicitacao/listaSolicitacao');
        listaDeSolicitacao.push(this.solicitacao);
        this.confirm("Solicitação aberta com sucesso!");
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
}
