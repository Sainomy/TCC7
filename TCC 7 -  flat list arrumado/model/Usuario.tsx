
export class Usuario {
    public id : string;
    public nome: string;
    public email : string;
    public password: string;
    public urlfoto : string;
    public numero: string;
    public categoria: string;
    public date: string;
        

    constructor(obj?: Partial<Usuario>) {
        if (obj) {
            this.id = obj.id
            this.email = obj.email
            this.urlfoto = obj.urlfoto
            this.nome = obj.nome
            this.numero = obj.numero
            this.categoria = obj.categoria
            this.date = obj.date
          
        }
    }

    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "nome": "${this.nome}",
            "email": "${this.email}",
            "urlfoto": "${this.urlfoto}"
            "numero": "${this.numero}"
            "categoria": "${this.categoria}"
            "date": "${this.date}"
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