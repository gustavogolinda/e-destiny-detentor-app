import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { VisualizarSolicitacoesComponent } from "./visualizarSolicitacoes.component";

const routes: Routes = [
    { path: "", component: VisualizarSolicitacoesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class VisualizarSolicitacoesRoutingModule { }
