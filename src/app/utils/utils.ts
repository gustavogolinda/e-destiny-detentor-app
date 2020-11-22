import { alert, confirm } from "tns-core-modules/ui/dialogs";

export class Utils {
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
            cancelButtonText: "Não",
            okButtonText: "Sim",
            message: message
        })
    }
}