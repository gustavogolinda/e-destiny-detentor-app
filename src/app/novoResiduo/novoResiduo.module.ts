import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DropDownModule } from "nativescript-drop-down/angular";

import { NovoResiduoRoutingModule } from "./novoResiduo-routing.module";
import { NovoResiduoComponent } from "./novoResiduo.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NovoResiduoRoutingModule,
        DropDownModule
    ],
    declarations: [
        NovoResiduoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NovoResiduoModule { }
