import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { NovaSolicitacaoRoutingModule } from "./novaSolicitacao-routing.module";
import { NovaSolicitacaoComponent } from "./novaSolicitacao.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NovaSolicitacaoRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        NovaSolicitacaoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NovaSolicitacaoModule { }
