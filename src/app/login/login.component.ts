import { AfterViewInit,Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../../model/usuario/usuario.model";
import { UserService } from "../../services/usuario/usuario.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { prompt } from "tns-core-modules/ui/dialogs";
import { Utils } from "../utils/utils";
import { AuthService } from "../seguranca/auth.service";
import { NavigationExtras } from "@angular/router";
import { TextField } from "tns-core-modules/ui/text-field";
import { android } from "tns-core-modules/application";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {
    public drawer: RadSideDrawer;
    isLoggingIn = true;
    user: User;
    utils: Utils;
    processing = false;
    jwtPayload = '';
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;
    @ViewChild("telefone", {static: false}) telefone: ElementRef;
    @ViewChild("email", {static: false}) email: ElementRef;

    constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions, private authService: AuthService) {
        this.page.actionBarHidden = true;
        this.utils = new Utils;
        this.user = new User();

    }

    toggleForm() {
        this.routerExtensions.navigate(['/cadastro']);
    }

    submit() {
        this.processing = true;
        if (!this.user.email || !this.user.senha) {
            this.processing = false;
            this.utils.alert("Informe um endereço de e-mail e a senha.");
            return;
        }

        if (!this.validarSenhaPreenchida()){
                
            this.processing = false;
            return;
        }
        this.login();
        this.processing = false;
    }

    login() {
        this.drawer.gesturesEnabled = true;
        this.processing = true;
        this.authService.login(this.user.email, this.user.senha)
        .then(() => {
            this.jwtPayload = this.authService.jwtPayload;
            console.log(this.jwtPayload);
            this.routerExtensions.navigate(['/home']);
        })
        .catch(erro => {
            this.user.senha = '';
            this.utils.alert("O usuário e/ou senha informados não correspondem a nenhuma conta existente.");
        });
    }

    async forgotPassword() {
        await prompt({
            title: "Esqueceu sua senha?",
            message: "Entre com o e-mail cadastrado para resetar a sua senha.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancelar"
        }).then((data) => {
            this.processing = true;
            if (data.result) {
                this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.utils.alert("Um e-mail foi enviado com sua nova senha.");
                        this.processing = false;
                    }).catch(() => {
                        this.utils.alert("Não foi possível resetar a senha para o email informado.");
                        this.processing = false;
                    });
            }
        });
        this.processing = false;
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }

    validarSenhaPreenchida(): Boolean{
        if ((this.user.senha == '') || (this.user.senha.length < 5)){
            this.utils.alert("Informe uma senha válida.");
            return false;
        }
        return true;
    }

    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            if (!this.validarSenhaPreenchida()) {
                return
            }
            this.confirmPassword.nativeElement.focus();
        }
    }

    focusTelefone() {
        this.telefone.nativeElement.focus();
    }

    focusEmail() {
        this.email.nativeElement.focus();
    }

    ngOnInit(): void {
        // this.page.getViewById<TextField>("password").android.setInputType(android.context.InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS | android.context.InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.drawer = <RadSideDrawer>app.getRootView();
            this.drawer.gesturesEnabled = false;
        },100);
    }
}
