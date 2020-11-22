import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { UserService } from "../../services/usuario/usuario.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AuthGuard } from "../seguranca/auth.guard";

export function tokenGetter(): string {
    let localStorage = require("tns-core-modules/application-settings");
    return localStorage.getString('token');
  }

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService,
        AuthGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
