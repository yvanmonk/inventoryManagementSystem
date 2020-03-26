export class User {
    
    public name: string;
    public first_name: string;
    public phone: string;
    public poste: string;
    public role: string;
    public city: string;
    public address: string;
    public email: string;
    public password: string;

    constructor(name?, email?, password?) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}