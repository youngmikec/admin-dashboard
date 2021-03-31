import { User } from "./user";

export interface Lien {
    id:         String;
    _id:        String;
    code:	    String;
    user:       User
    amount:	    Number;	
    reason:	    String;	
    remark:	    String;	
    enabled:	Boolean;    
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Lien {
    id:         String;
    _id:        String;
    code:	    String;
    user:       User
    amount:	    Number;	
    reason:	    String;	
    remark:	    String;	
    enabled:	Boolean; 
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