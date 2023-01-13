
export class Endereco {
    public id : string;
    public cep: string;
    public pais : string;
    public password: string;
    public cidade : string;
    public uf: string;
    public logadouro: string;
    public numero: string;
    public complemento: string;
    public lat: string;
    public long: string;
        

    constructor(obj?: Partial<Endereco>) {
        if (obj) {
            this.id = obj.id
            this.pais = obj.pais
            this.cidade = obj.cidade
            this.cep = obj.cep
            this.uf = obj.uf
            this.logadouro = obj.logadouro
            this.numero = obj.numero
            this.complemento = obj.complemento
            this.lat = obj.lat
            this.long = obj.long
          
        }
    }

    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "cep": "${this.cep}",
            "pais": "${this.pais}",
            "cidade": "${this.cidade}"
            "uf": "${this.uf}"
            "logadouro": "${this.logadouro}"
            "numero": "${this.numero}"
            "complemento": "${this.complemento}"
            "lat": "${this.lat}"
            "long": "${this.long}"
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