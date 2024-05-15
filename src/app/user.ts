export class User{
    id!: number;
    name!:string;
    firstname!: string;
    lastname!:string;
    email!: string;
    address!: {
        street:string;
        city:string;
        zipcode:string;
    };
    
}
