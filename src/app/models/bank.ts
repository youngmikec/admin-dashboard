import { User } from "./user";

export interface Bank {
    id: string;
    _id: string;
    name:	string;
    sortCode:	string;
    bankCode:	string;	
    shortName?:	string;	
    country?:	String;
    contactPerson?:	string;	
    website?: string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;

}

export class Bank {
    id: string;
    _id: string;
    name:	string;
    sortCode:	string;
    bankCode:	string;	
    shortName?:	string;	
    country?:	String;
    contactPerson?:	string;	
    website?: string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;

    constructor(fields: any){
        for(let f of fields){
            this[f] = fields[f];
        }
    }
}