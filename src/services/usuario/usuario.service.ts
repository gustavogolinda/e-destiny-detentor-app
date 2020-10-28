import { Injectable } from "@angular/core";
import { User } from "../../model/usuario/usuario.model";
import api from "../../api/api";

@Injectable()
export class UserService {

    async register(user: User) {
        
        return await api.post('/detentor', {
            nome: user.nome,
            senha: user.senha,
            email: user.email,
            telefone: user.telefone
        });
    }

    login(user: User) {
        return "Logado com sucesso!";
    }

    logout() {
        return "Deslogado!";
    }

    resetPassword(email) {
        return "Senha resetada!";
    }
}
