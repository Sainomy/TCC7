
export class Foto {
    public id : string;
    public urlfoto: string;
        

    constructor(obj?: Partial<Foto>) {
        if (obj) {
            this.id = obj.id
            this.urlfoto = obj.urlfoto
        }
    }

    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "urlfoto": "${this.urlfoto}"
        }`

        //const fields = Object.values(this).join(', ')
        // const campos = Object.keys(this).join(': ')
        // const valor=Object.values(this).join(', ')
        // return `Usuario {${campos+valor}}`
        
        //let userStr = '{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}';
        // let userObj = JSON.parse(Objeto);
        // console.log(userObj);

        return Objeto
    }

};