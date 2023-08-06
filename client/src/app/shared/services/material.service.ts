declare var M:any;

export class MaterialService {
    static toast(message: string):void {
        M.toast({html: message})
    }
}