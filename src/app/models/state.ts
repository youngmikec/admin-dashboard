import { Admin } from "./admin";
import { User } from "./user";

export interface State { 
    id:         String;
    _id:        String;
    name:	    String;
    country:	String;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class State { 
    id:         String;
    _id:        String;
    name:	    String;
    country:	String;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;

    constructor( fields: any ){
        for(let f of fields){
            this[f] = fields[f];
        }
    }
}