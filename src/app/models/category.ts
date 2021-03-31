import { User } from "./user";

export interface Category {
    
    id?:            string;
    _id?:           string;
    code:	        string;             //Category code of resource
    cost:	        number;             //Category charge per unit density per Km
    name:	        string;	            //Category name    
    description:	String;	            //Category description
    parent:	        string;	            //Category of current record
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;

}


export class Category {

    id?:            string;
    _id?:           string;
    code:	        string;             //Category code of resource
    cost:	        number;             //Category charge per unit density per Km
    name:	        string;	            //Category name    
    description:	String;	            //Category description
    parent:	        string;	            //Category of current record
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
    
    constructor(fields:any){
        for(let f of fields){
            this[f] = fields[f];
        }
    }
}