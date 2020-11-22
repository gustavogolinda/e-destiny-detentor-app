import { Component, OnInit, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { User } from "~/model/usuario/usuario.model";
import { Solicitacao } from "~/model/solicitacao/solicitacao.model";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { AuthService } from "../seguranca/auth.service";
import { UserService } from "~/services/usuario/usuario.service";
import { Utils } from "../utils/utils";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['../login/login.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    public drawer: RadSideDrawer;
    public user: User;
    private utils: Utils;
    private appSettings = require("tns-core-modules/application-settings");
    constructor(private routerExtensions: RouterExtensions, private page: Page, private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {
        // this.page.actionBarHidden = true;
        // Use the component constructor to inject providers.
        this.user = new User;
        this.user.nome = this.authService.jwtPayload['nome'];
        this.user.email = this.authService.jwtPayload['user_name'];
        this.utils = new Utils;
    }

    novaSolicitaoClick(){
        let solicitacao = new Solicitacao;
        solicitacao.detentor = this.user;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                DataList: JSON.stringify(solicitacao),
                clearHistory: false
            } 
        };
        this.routerExtensions.navigate(["/novaSolicitacao"], navigationExtras);
    }

    ngOnInit(): void {
        
    }

    toggleForm(){
        this.authService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    listarSolicitacoesClick(){
        this.routerExtensions.navigate(["/visualizarSolicitacoes"], { clearHistory: false });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.drawer = <RadSideDrawer>app.getRootView();
            this.drawer.gesturesEnabled = false;
        },100);
    }
    // N quis remover a sidebar do projeto pq acho que depois vamos usar, então só desabilitei
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
