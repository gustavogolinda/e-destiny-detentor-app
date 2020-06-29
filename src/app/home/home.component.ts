import { Component, OnInit, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['../login/login.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    public drawer: RadSideDrawer;
    constructor(private routerExtensions: RouterExtensions, private page: Page) {
        this.page.actionBarHidden = true;
        // Use the component constructor to inject providers.
    }

    novaSolicitaoClick(){
        this.routerExtensions.navigate(["/novaSolicitacao"], { clearHistory: false});
    }

    ngOnInit(): void {
        
        // Init your component properties here.
    }

    toggleForm(){
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
