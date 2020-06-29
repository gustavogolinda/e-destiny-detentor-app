import { AfterViewInit,Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../usuario/usuario.model";
import { UserService } from "../usuario/usuario.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { alert, prompt, confirm } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {
    public drawer: RadSideDrawer;
    isLoggingIn = true;
    user: User;
    processing = false;
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;

    constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.email = "";
        this.user.password = "";
        this.user.confirmPassword = "";
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            this.alert("Informe um endereço de e-mail e a senha.");
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
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
        // this.userService.login(this.user)
            // .then(() => {
            //     this.processing = false;
            //     this.routerExtensions.navigate(["/home"], { clearHistory: true });
            // })
            // .catch(() => {
            //     this.processing = false;
            //     this.alert("Unfortunately we could not find your account.");
            // });
    }

    register() {
        if (this.user.password != this.user.confirmPassword) {
            this.alert("As senhas informadas não são iguais.");
            return;
        }
        this.confirm("Cadastrado com sucesso!");
        this.login();
        // this.userService.register(this.user)
            // .then(() => {
            //     this.processing = false;
            //     this.alert("Your account was successfully created.");
            //     this.isLoggingIn = true;
            // })
            // .catch(() => {
            //     this.processing = false;
            //     this.alert("Unfortunately we were unable to create your account.");
            // });
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
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "e-Destiny",
            okButtonText: "OK",
            message: message
        });
    }

    confirm(message: string){
        return confirm({
            title: "e-Destiny",
            okButtonText: "OK",
            message: message
        })
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
