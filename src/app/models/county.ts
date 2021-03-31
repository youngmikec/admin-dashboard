import { State } from "./state";
import { User } from "./user";

export interface County { 
    id:         String;
    _id:        String;
    name:	    String;
    state:      State;	
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class County { 
    id:         String;
    _id:        String;
    name:	    String;
    state:      State;	
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