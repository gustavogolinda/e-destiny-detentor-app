import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CadastroRoutingModule } from "./cadastro-routing.module";
import { CadastroComponent } from "./cadastro.component";
import { UserService } from "../../services/usuario/usuario.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        CadastroRoutingModule,
    ],
    declarations: [
        CadastroComponent
    ],
    providers: [
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CadastroModule { }
