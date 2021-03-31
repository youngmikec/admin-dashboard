import { Admin } from "./admin";
import { User } from "./user";

export interface Country {
    id:             String;
    _id:            String;
    name:	        String;	
    iso2:	        String;
    iso3:	        String;
    callingCodes:	String;
    currencies:	    String;
    ioc:	        String;
    languages:	    String;
    status:	        String;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Country {
    id:             String;
    _id:            String;
    name:	        String;	
    iso2:	        String;
    iso3:	        String;
    callingCodes:	String;
    currencies:	    String;
    ioc:	        String;
    languages:	    String;
    status:	        String;
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