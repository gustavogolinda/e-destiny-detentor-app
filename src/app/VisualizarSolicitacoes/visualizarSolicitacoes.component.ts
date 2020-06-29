import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";
import { EventData, fromObject } from "tns-core-modules/data/observable";
import { Solicitacao } from "../solicitacao/solicitacao.model";

@Component({
    selector: "VisualizarSolicitacoes",
    templateUrl: "./visualizarSolicitacoes.component.html"
})
export class VisualizarSolicitacoesComponent implements OnInit {

    
    public listaSolicitacoes = require('../listaSolicitacao/listaSolicitacao');

    constructor(private page: Page) {
        this.page.actionBarHidden = true;
        // const vm = fromObject({
        // // Setting the listview binding source
        // listaSolicitacoes
        // });
        // this.page.bindingContext = vm;
        // console.log(vm);
        // console.log(listaSolicitacoes);
        console.log(this.listaSolicitacoes);
    }

    ngOnInit(): void {
        console.log("teste");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
