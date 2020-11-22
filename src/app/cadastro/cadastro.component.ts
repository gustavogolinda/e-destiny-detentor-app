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
import { Endereco } from "~/model/endereco/endereco.model";
import { NavigationExtras } from "@angular/router";
import { ViaCepService } from "~/services/via-cep/via-cep.service";

@Component({
    selector: "Cadastro",
    templateUrl: "./Cadastro.component.html",
    styleUrls: ['./Cadastro.component.css']
})
export class CadastroComponent implements AfterViewInit, OnInit {
    public drawer: RadSideDrawer;
    isLoggingIn = true;
    user: User;
    utils: Utils;
    processing = false;
    visibleCadastroUsuario = true;
    visibleCadastroCEP = false;
    visibleCadastroEndereco = false;
    endereco: Endereco;
    confirmaSenha = '';
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;
    @ViewChild("telefone", {static: false}) telefone: ElementRef;
    @ViewChild("email", {static: false}) email: ElementRef;

    constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions, private authService: AuthService, private ViaCepService: ViaCepService) {
        this.page.actionBarHidden = true;
        this.utils = new Utils;
        this.user = new User();
        this.endereco = new Endereco();
    }

    toggleForm() {
        this.routerExtensions.navigate(['/login']);
    }

    naoSabeCEP(){
        this.visibleCadastroCEP = false;
        this.visibleCadastroEndereco = true;
    }

    async submit() {
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
        if (this.visibleCadastroEndereco){
            this.user.endereco = this.endereco;
            this.register();
        } else if (this.visibleCadastroUsuario){
            this.visibleCadastroCEP = true;
            this.visibleCadastroUsuario = false;
        } else {
            this.endereco.cep = this.userService.removerCaracterEspecial(this.endereco.cep);
            if (this.endereco.cep) {
                await this.ViaCepService.consultaEnderecoViaCep(this.endereco.cep)
                  .then(response => {
                    this.endereco.logradouro = response.logradouro;
                    this.endereco.complemento = response.complemento;
                    this.endereco.bairro = response.bairro;
                    this.endereco.cidade = response.localidade;
                    this.endereco.estado = response.uf;
                    this.user.endereco = this.endereco;
                    this.visibleCadastroEndereco = true;
                    this.visibleCadastroCEP = false;
                    this.processing = false;
                  }).catch(
                    erro => {
                      this.utils.alert("Atenção! Não foi possível encontrar o endereço para o CEP informado!");
                      console.log(erro);
                      this.processing = false;
                    }
                );
            }
        }
    }

    async login() {
        this.drawer.gesturesEnabled = true;
        this.processing = true;
        this.authService.login(this.user.email, this.user.senha)
        .then(() => {
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    nome: this.authService.jwtPayload['nome'],
                    clearHistory: true
                } 
            };
            this.routerExtensions.navigate(['/home'], navigationExtras);
        })
        .catch(erro => {
            this.utils.alert("Ocorreu um erro ao tentar criar a sua conta. Tente novamente após alguns minutos.");
        });
    }

    async register() {
        if (this.user.senha != this.confirmaSenha) {
            this.utils.alert("As senhas informadas não são iguais.");
            return;
        }
        
        this.processing = true;
        this.user.endereco = this.endereco;
        await this.userService.register(this.user)
            .then(() => {
                this.login();
            })
            .catch(() => {
                this.processing = false;
                this.utils.alert("Ocorreu um erro ao tentar criar a sua conta. Tente novamente após alguns minutos.");
            });
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
