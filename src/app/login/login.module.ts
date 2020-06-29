import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { UserService } from "../usuario/usuario.service";
import { KinveyModule, UserService as KinveyUserService } from "kinvey-nativescript-sdk/lib/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        LoginRoutingModule,

        KinveyModule.init({
            appKey: "",
            appSecret: ""
        })
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
