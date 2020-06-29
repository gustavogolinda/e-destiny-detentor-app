import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NovaSolicitacaoRoutingModule } from "./novaSolicitacao-routing.module";
import { NovaSolicitacaoComponent } from "./novaSolicitacao.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NovaSolicitacaoRoutingModule
    ],
    declarations: [
        NovaSolicitacaoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeaturedModule { }
