import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData, Page, View } from "tns-core-modules/ui/page";
import { Solicitacao } from "../../model/solicitacao/solicitacao.model";
import { Residuo } from "../../model/residuo/residuo.model";
import { Utils } from "../utils/utils";
import { ValueList, DropDown, SelectedIndexChangedEventData } from "nativescript-drop-down";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { ListViewEventData } from "nativescript-ui-listview";

@Component({
    selector: "novoResiduo",
    templateUrl: "./novoResiduo.component.html",
    styleUrls: ['../login/login.component.css', "./novoResiduo.component.css"]
})

export class NovoResiduoComponent implements OnInit {
    @ViewChild('dd', { static: true }) unidadeMedidaDD: ElementRef;
    @ViewChild('cc', { static: true }) categoriaDD: ElementRef;
    public drawer: RadSideDrawer;
    solicitacao: Solicitacao;
    residuo: Residuo;
    editandoResiduo = false;
    indexResiduo: number;
    selectedIndexCategoria: number;
    selectedIndexUnidadeMedida: number
    listaResiduos: Residuo[] = [];
    utils: Utils;
    visualizandoSolicitacao = false;
    habilitaEdicao = true;
    unidadesMedida = new ValueList<string>([
        { value: "KG", display: "Quilo" }, 
        { value: "QUANTIDADE", display: "Unidade" }
    ]);
    categorias = ['Smartphone', 'Computadores', 'Tablet'];
    appSettings = require("tns-core-modules/application-settings");
    constructor(private routerExtensions: RouterExtensions, private page: Page, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.solicitacao = JSON.parse(params["DataList"]);
            this.indexResiduo = params["indexResiduo"];
            this.editandoResiduo = params["editandoResiduo"];
            this.visualizandoSolicitacao = params["visualizandoSolicitacao"];
        });
        this.utils = new Utils();
    
        if (this.editandoResiduo){
            this.residuo = this.solicitacao.residuos[this.indexResiduo];
            this.selectedIndexCategoria = this.categorias.indexOf(this.residuo.categoria.descricao);
            if (this.residuo.unidadeMedida == 'KG'){
                this.selectedIndexUnidadeMedida = 0;
            } 
            if (this.residuo.unidadeMedida == 'QUANTIDADE') {
                this.selectedIndexUnidadeMedida = 1;
            }
            console.log(this.residuo.unidadeMedida);
        }else {
            this.residuo = new Residuo();
        }
        this.habilitaEdicao = !this.visualizandoSolicitacao;
    }

    ngOnInit(): void {
        
    }

    Voltar(){
        let navigationExtras: NavigationExtras = {
            queryParams: {
                DataList: JSON.stringify(this.solicitacao),
                visualizandoSolicitacao: this.visualizandoSolicitacao,
                clearHistory: true
            } 
        };
        this.routerExtensions.navigate(["/novaSolicitacao"], navigationExtras);
    }

    async submit() {
        let inserirResiduo = false;
        if (!this.editandoResiduo){
            inserirResiduo = await this.utils.confirm("Confirma a adição deste item à sua solicitação de coleta?").then(function(result){
                return result;
            });
            if ((!(this.residuo.quantidade > 0) || !(this.residuo.unidadeMedida != null) || !(this.residuo.categoria.descricao) || !(this.residuo.descricao) || !(this.residuo.descricao != '')) && (inserirResiduo)){
                await this.utils.alert("Atenção! É necessário preencher todos os campos antes de adicionar um resíduo!");
                inserirResiduo = false;
            };
        } else {
            inserirResiduo = await this.utils.confirm("Confirma a edição deste item?").then(function(result){
                return result;
            });
            if ((!(this.residuo.quantidade > 0) || !(this.residuo.unidadeMedida != null) || !(this.residuo.categoria.descricao) || !(this.residuo.descricao) || !(this.residuo.descricao != '')) && (inserirResiduo)){
                console.log(this.residuo + ' ' + this.residuo.unidadeMedida + ' ' + this.residuo.descricao)
                await this.utils.alert("Atenção! É necessário preencher todos os campos antes de salvar o resíduo!");
                inserirResiduo = false;
            };
        }
        if (!inserirResiduo){
            return;
        }
        if (!this.editandoResiduo){
            this.solicitacao.residuos.push(this.residuo);
        } else {
            this.solicitacao.residuos[this.indexResiduo] = this.residuo;
        }
        let navigationExtras: NavigationExtras = {
            queryParams: {
                DataList: JSON.stringify(this.solicitacao),
                clearHistory: true
            } 
        };
        this.routerExtensions.navigate(["/novaSolicitacao"], navigationExtras);
    }


    async cancel(){
        let cancelarInsercao = false;
        if (!this.editandoResiduo){
            cancelarInsercao = await this.utils.confirm("Deseja mesmo cancelar a adição deste item à sua solicitação de coleta?").then(function(result){
                return result;
            });
        } else {
            cancelarInsercao = await this.utils.confirm("Deseja mesmo cancelar a edição deste item?").then(function(result){
                return result;
            });
        }
        if (!cancelarInsercao){
            return;
        }
        let navigationExtras: NavigationExtras = {
            queryParams: {
                DataList: JSON.stringify(this.solicitacao),
                clearHistory: true
            } 
        };
        this.routerExtensions.navigate(["/novaSolicitacao"], navigationExtras);
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
    
    onChangeCategoria(args: SelectedIndexChangedEventData){
        this.residuo.categoria.descricao = this.categorias[args.newIndex];
    }
    
    onChangeMedida(args: SelectedIndexChangedEventData){
        this.residuo.unidadeMedida = this.unidadesMedida[args.newIndex];
        console.log(this.residuo.unidadeMedida);
    }
}
