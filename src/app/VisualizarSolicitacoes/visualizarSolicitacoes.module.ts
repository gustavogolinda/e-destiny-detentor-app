import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { VisualizarSolicitacoesRoutingModule } from "./visualizarSolicitacoes-routing.module";
import { VisualizarSolicitacoesComponent } from "./visualizarSolicitacoes.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VisualizarSolicitacoesRoutingModule
    ],
    declarations: [
        VisualizarSolicitacoesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VisualizarSolicitacoesModule { }
