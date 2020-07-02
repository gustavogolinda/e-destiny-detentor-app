import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { Solicitacao } from "../solicitacao/solicitacao.model";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array";

@Component({
    selector: "VisualizarSolicitacoes",
    templateUrl: "./visualizarSolicitacoes.component.html",
    styleUrls: ['./visualizarSolicitacoes.component.css']
})
export class VisualizarSolicitacoesComponent implements OnInit {

    public listaItems: ObservableArray<any>;
    listaSolicitacoes = require('../listaSolicitacao/listaSolicitacao');
    isLoading = false;
    listLoaded = false;

    constructor(private page: Page) {
        // this.page.actionBarHidden = true;
        // const vm = fromObject({
        // // Setting the listview binding source
        // listaSolicitacoes
        // });
        // this.page.bindingContext = vm;
        // console.log(vm);
        // console.log(listaSolicitacoes);
        // console.log(this.listaSolicitacoes);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.listaItems = new ObservableArray(this.listaSolicitacoes);
        console.log(this.listaItems.getItem(0));
        this.isLoading = false;
        this.listLoaded = true;
    }

    onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args.object;
        var rightItem = swipeView.getViewById<View>("delete-view");
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.left = 0;
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    onCellSwiping(args: ListViewEventData) {
        // var swipeLimits = args.data.swipeLimits;
        // var swipeView = args.object;
        // var rightItem = swipeView.getViewById<View>("delete-view");
        // swipeLimits.right = rightItem.getMeasuredWidth();
        // swipeLimits.left = 0;
        // swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    onRightSwipeClick(args: ListViewEventData) {
        // var swipeLimits = args.data.swipeLimits;
        // var swipeView = args.object;
        // var rightItem = swipeView.getViewById<View>("delete-view");
        // swipeLimits.right = rightItem.getMeasuredWidth();
        // swipeLimits.left = 0;
        // swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    onSwipeCellFinished(args: ListViewEventData) {
        // var swipeLimits = args.data.swipeLimits;
        // var swipeView = args.object;
        // var rightItem = swipeView.getViewById<View>("delete-view");
        // swipeLimits.right = rightItem.getMeasuredWidth();
        // swipeLimits.left = 0;
        // swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    delete(args: ListViewEventData) {
        let solicitacao = <Solicitacao>args.object.bindingContext;
        let index = this.listaSolicitacoes.indexOf(solicitacao);
        this.listaSolicitacoes.splice(index, 1);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
