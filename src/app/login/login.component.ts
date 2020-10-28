import { AfterViewInit,Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../../model/usuario/usuario.model";
import { UserService } from "../../services/usuario/usuario.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { prompt } from "tns-core-modules/ui/dialogs";
import { Utils } from "../utils/utils";

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
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;
    @ViewChild("telefone", {static: false}) telefone: ElementRef;
    @ViewChild("email", {static: false}) email: ElementRef;

    constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
        this.utils = new Utils;
        this.user = new User();
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.senha) {
            this.utils.alert("Informe um endereço de e-mail e a senha.");
            return;
        }

        if (!this.validarSenhaPreenchida()){
            return;
        }
        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
        this.processing = false;
    }

    login() {
        this.drawer.gesturesEnabled = true;
        // this.processing = true;
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
        // this.userService.login(this.user)
            // .then(() => {
            //     this.processing = false;
            //     this.routerExtensions.navigate(["/home"], { clearHistory: true });
            // })
            // .catch(() => {
            //     this.processing = false;
            //     this.alert("O usuário e/ou senha informados não correspondem a nenhuma conta existente.");
            // });
    }

    async register() {
        if (this.user.senha != this.user.confirmaSenha) {
            this.utils.alert("As senhas informadas não são iguais.");
            return;
        }
        
        this.processing = true;
        await this.userService.register(this.user)
            .then((res) => {
                const {id} = res.data;
                console.log(id);
                this.user.id = id;
                this.processing = false;
                this.utils.confirm("Cadastrado com sucesso!");
                this.isLoggingIn = true;
                this.login();
            })
            .catch(() => {
                this.processing = false;
                this.utils.alert("Ocorreu um erro desconhecido ao tentar criar a sua conta. Tente novamente após alguns minutos.");
            });
        console.log(this.user);
    }

    forgotPassword() {
        prompt({
            title: "Esqueceu sua senha?",
            message: "Entre com o e-mail cadastrado para resetar a sua senha.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancelar"
        }).then((data) => {
            if (data.result) {
                // this.userService.resetPassword(data.text.trim())
                //     .then(() => {
                //         this.alert("Sua senha foi resetada com sucesso! Um e-mail foi enviado com instruções para resetar a senha.");
                //     }).catch(() => {
                //         this.alert("Um erro ocorreu.");
                //     });
            }
        });
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
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.drawer = <RadSideDrawer>app.getRootView();
            this.drawer.gesturesEnabled = false;
        },100);
    }
}
