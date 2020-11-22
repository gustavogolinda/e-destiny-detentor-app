import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "visualizarSolicitacoes", loadChildren: () => import("~/app/visualizarSolicitacoes/visualizarSolicitacoes.module").then((m) => m.VisualizarSolicitacoesModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "novaSolicitacao", loadChildren: () => import("~/app/novaSolicitacao/novaSolicitacao.module").then((m) => m.NovaSolicitacaoModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) },
    { path: "novoResiduo", loadChildren: () => import("~/app/novoResiduo/novoResiduo.module").then((m) => m.NovoResiduoModule) },
    { path: "cadastro", loadChildren: () => import("~/app/cadastro/cadastro.module").then((m) => m.CadastroModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
