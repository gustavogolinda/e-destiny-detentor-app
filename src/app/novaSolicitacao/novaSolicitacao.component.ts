import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData, Page } from "tns-core-modules/ui/page";
import { Observable, View } from 'tns-core-modules/ui/core/view';
import { Solicitacao } from "../../model/solicitacao/solicitacao.model";
import { Residuo } from "../../model/residuo/residuo.model";
import { Utils } from "../utils/utils";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { SolicitacaoService } from "~/services/solicitacao/solicitacao.service";
import { UserService } from "~/services/usuario/usuario.service";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ModalDatetimepicker, PickerOptions } from 'nativescript-modal-datetimepicker';
import { AuthService } from "../seguranca/auth.service";

@Component({
    // selector: "novaSolicitacao",
    selector: "tk-listview-swipe-actions",
    templateUrl: "./novaSolicitacao.component.html",
    styleUrls: ["../login/login.component.css", "./novaSolicitacao.component.css"]
})

export class NovaSolicitacaoComponent implements OnInit {
    public drawer: RadSideDrawer;
    solicitacao: Solicitacao;
    residuo: Residuo;
    listaResiduos: ObservableArray<any>;
    listaItems: ObservableArray<any>;
    utils: Utils;
    isLoading: Boolean;
    unidadesMedida = ['UN', 'KG'];
    listLoaded = false;
    visibleListaResiduos = false;
    visibleInstrucoes = true;
    swipeViewAtual: RadListView;
    appSettings = require("tns-core-modules/application-settings");
    visualizandoSolicitacao = false;
    
    ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
    picker = new this.ModalPicker();
    private modalDatetimepicker: ModalDatetimepicker;
    @ViewChild("myListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;
    constructor(private routerExtensions: RouterExtensions, private page: Page, private route: ActivatedRoute, private solicitacaoService: SolicitacaoService, private userService: UserService, private authService: AuthService) {
        // this.page.actionBarHidden = true;
        this.route.queryParams.subscribe(params => {
            this.solicitacao = JSON.parse(params["DataList"]);
            this.visualizandoSolicitacao = params["visualizandoSolicitacao"];
        });
        if (this.solicitacao.residuos.length <= 0){
            if (this.appSettings.hasKey('solicitacaoAtual')){
                this.solicitacao = JSON.parse(this.appSettings.getString('solicitacaoAtual'))
            }
        } else {
            this.appSettings.setString('solicitacaoAtual', JSON.stringify(this.solicitacao))
        }
        console.log(this.visualizandoSolicitacao);
        this.listLoaded = false;
        this.modalDatetimepicker = new ModalDatetimepicker();
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.utils = new Utils;
        this.listaItems = new ObservableArray(this.solicitacao.residuos);
        this.visibleListaResiduos = this.listaItems.length > 0;
        this.visibleInstrucoes = !this.visibleListaResiduos;
        this.isLoading = false;
        this.listLoaded = true;
    }

    selectDate() {
        this.modalDatetimepicker.pickDate(<PickerOptions>{
            title: "Selecione a data",
            theme: "light",
            startingDate: new Date(),
            maxDate: new Date('2021-01-01'),
            minDate: new Date()
        }).then((result:any) => {
            if (result) {
                console.log("Date is: " + result.day + "-" + result.month + "-" + result.year);
            } else {
            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    };

    closeProgramatically() {
        this.modalDatetimepicker.pickDate(<PickerOptions>{
            title: "Selecione a data",
            theme: "light",
            startingDate: new Date(),
            maxDate: new Date('2021-01-01'),
            minDate: new Date()
        }).then((result:any) => {
            if (result) {
                console.log("date", "Date is: " + result.day + "-" + result.month + "-" + result.year);
            } else {
                console.log("date", false);
            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });

        setTimeout(() => {
            this.modalDatetimepicker.close();
        }, 1000);
    }

    async submit() {
        this.appSettings.setString('solicitacaoAtual', JSON.stringify(this.solicitacao));
        await this.userService.findByEmail(this.authService.jwtPayload["user_name"])
        .then(response => {
            this.solicitacao.detentor = response;
            console.log(this.solicitacao.detentor)
        })
        .catch(erro => {
            this.solicitacao.detentor.senha = '';
            this.appSettings.remove('solicitacaoAtual');
            this.appSettings.remove('token');
            this.routerExtensions.navigate(["/login"], { clearHistory: true });
            this.utils.alert("Atenção! Não foi possível encontrar dados para o usuário logado.");
        });
        await this.solicitacaoService.abrirSolicitacao(this.solicitacao)
        .then((response) => {
            this.solicitacao = response['content'];
            this.appSettings.remove('solicitacaoAtual');
            this.utils.alert("Solicitação aberta com sucesso!");
            this.routerExtensions.navigate(["/home"], { clearHistory: true });
        })
        .catch((response) => {
            this.utils.alert("Ocorreu um erro ao criar a solicitação!");
            return
        })
    }


    RetornarAoMenu(){
        if (this.visualizandoSolicitacao){
            this.routerExtensions.navigate(["/visualizarSolicitacoes"], { clearHistory: true });
        } else{ 
            this.appSettings.setString('solicitacaoAtual', JSON.stringify(this.solicitacao))
            this.routerExtensions.navigate(["/home"], { clearHistory: true });
        }
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

    addResiduo(){
        let navigationExtras: NavigationExtras = {
            queryParams: {
                DataList: JSON.stringify(this.solicitacao),
                clearHistory: true
            } 
        };
        this.routerExtensions.navigate(["/novoResiduo"], navigationExtras);
    }

    onItemTap(args: ItemEventData) {        
        let navigationExtras: NavigationExtras = {
            queryParams: {
                DataList: JSON.stringify(this.solicitacao),
                visualizandoSolicitacao: this.visualizandoSolicitacao,
                indexResiduo: args.index,
                editandoResiduo: true,
                clearHistory: false
            } 
        };
        console.log(args.index);
        this.routerExtensions.navigate(["/novoResiduo"], navigationExtras);
    }

    public onCellSwiping(args: ListViewEventData) {
    }
    // << angular-listview-swipe-action-release-notify

    // >> angular-listview-swipe-action-release-limits
    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args['object'];
        this.swipeViewAtual = swipeView;
        const leftItem = swipeView.getViewById<View>('mark-view');
        const rightItem = swipeView.getViewById<View>('delete-view');
        if (!this.visualizandoSolicitacao){
            swipeLimits.left = rightItem.getMeasuredWidth();
        } else {
            swipeLimits.left = 0;
        }
        swipeLimits.right = 0;
        // swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }
    // << angular-listview-swipe-action-release-limits

    // >> angular-listview-swipe-action-release-execute
    public onSwipeCellFinished(args: ListViewEventData) {
    }

    public async onRightSwipeClick(args: ListViewEventData) {
        let index = this.solicitacao.residuos.indexOf(args.object.bindingContext);
        this.solicitacao.residuos.splice(index, 1);
        this.listaItems.splice(index,1);
    }
    
}
