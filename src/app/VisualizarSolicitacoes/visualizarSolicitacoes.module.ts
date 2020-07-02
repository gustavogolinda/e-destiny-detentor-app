import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { VisualizarSolicitacoesRoutingModule } from "./visualizarSolicitacoes-routing.module";
import { VisualizarSolicitacoesComponent } from "./visualizarSolicitacoes.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VisualizarSolicitacoesRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        VisualizarSolicitacoesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VisualizarSolicitacoesModule { }
