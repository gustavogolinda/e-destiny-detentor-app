import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { Solicitacao } from "../../model/solicitacao/solicitacao.model";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array";
import { SolicitacaoService } from "~/services/solicitacao/solicitacao.service";
import { UserService } from "~/services/usuario/usuario.service";
import { AuthService } from "../seguranca/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { Utils } from "../utils/utils";
import { ItemEventData } from "tns-core-modules/ui/list-view";

@Component({
    selector: "VisualizarSolicitacoes",
    templateUrl: "./visualizarSolicitacoes.component.html",
    styleUrls: ["./visualizarSolicitacoes.component.css", "../login/login.component.css"]
})
export class VisualizarSolicitacoesComponent implements OnInit {

    public listaItems: ObservableArray<any>;
    listaSolicitacoes: Array<Solicitacao>;
    isLoading = false;
    listLoaded = false;
    utils: Utils;
    totalRegistros: number;
    appSettings = require("tns-core-modules/application-settings");

    constructor(private routerExtensions: RouterExtensions,  private route: ActivatedRoute, private page: Page, private solicitacaoService: SolicitacaoService, private userService: UserService, private authService: AuthService) {
        this.utils = new Utils();
    }

    async ngOnInit() {
        this.isLoading = true;
        console.log('Teste');
        await this.solicitacaoService.buscarSolicitacoesPorUsuario(this.authService.jwtPayload['user_name'])
        .then(resultado => {
            console.log(resultado);
            this.listaSolicitacoes = resultado;
        })
        .catch(resultado => {
            this.utils.alert("Atenção! Não foi possível obter os dados, tente novamente em alguns minutos.")
            this.routerExtensions.navigate(["/home"], { clearHistory: true });
        });
        console.log('Teste 2');

        if (this.totalRegistros == 0){
            this.utils.alert("Atenção! Não foi possível encontrar nenhuma solicitação para o usuário logado.");
            this.routerExtensions.navigate(["/home"], { clearHistory: true });
        }
        this.listaItems = new ObservableArray(this.listaSolicitacoes);
        // console.log(this.listaSolicitacoes);
        console.log(this.listaItems.getItem(0));
        this.isLoading = false;
        this.listLoaded = true;
    }

    onItemTap(args: ItemEventData) {        
        let navigationExtras: NavigationExtras = {
            queryParams: {
                DataList: JSON.stringify(this.listaSolicitacoes[args.index]),
                visualizandoSolicitacao: true,
                clearHistory: false
            } 
        };
        this.routerExtensions.navigate(["/novaSolicitacao"], navigationExtras);
    }

    public onCellSwiping(args: ListViewEventData) {
    }
    // << angular-listview-swipe-action-release-notify

    // >> angular-listview-swipe-action-release-limits
    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args['object'];
        const leftItem = swipeView.getViewById<View>('mark-view');
        const rightItem = swipeView.getViewById<View>('delete-view');
    
        swipeLimits.left = rightItem.getMeasuredWidth();
        // swipeLimits.right = 0;
        // swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }
    // << angular-listview-swipe-action-release-limits

    // >> angular-listview-swipe-action-release-execute
    public onSwipeCellFinished(args: ListViewEventData) {
    }

    public async onRightSwipeClick(args: ListViewEventData) {
        let index = this.listaSolicitacoes.indexOf(args.object.bindingContext);
        this.listaSolicitacoes.splice(index, 1);
        this.listaItems.splice(index,1);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    RetornarAoMenu(){
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }
}
