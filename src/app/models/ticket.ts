import { Admin, Category, Rating, Sms, User } from "./index";


export interface Ticket {
    id:                 String;
    _id:                String;
    code:	            String;	
    type:	            String;    // "BILLING" | "TECHNICAL"	
    category:	        Category;
    complainan:	        "ADMIN"| "PARTNER"| "CUSTOMER"| "SUPPLIER";
    customer:           User;
    admin:              Admin;
    supplier:	        User;
    messages:	        Array<Sms>;
    subject:	        String;
    complaint:	        String;
    priority:	        "LOW"|"NORMAL"|"HIGH";
    rating:             Rating ;
    status:             "OPEN" | "CLOSED" | "PENDING";
    remark:	            String;
    officer:            Admin;
    officerReply:	    Boolean;
    complainantReply:	Boolean;	
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Ticket {
    id:                 String;
    _id:                String;
    code:	            String;	
    type:	            String;    // "BILLING" | "TECHNICAL"	
    category:	        Category;
    complainan:	        "ADMIN"| "PARTNER"| "CUSTOMER"| "SUPPLIER";
    customer:           User;
    admin:              Admin;
    supplier:	        User;
    messages:	        Array<Sms>;
    subject:	        String;
    complaint:	        String;
    priority:	        "LOW"|"NORMAL"|"HIGH";
    rating:             Rating ;
    status:             "OPEN" | "CLOSED" | "PENDING";
    remark:	            String;
    officer:            Admin;
    officerReply:	    Boolean;
    complainantReply:	Boolean;	
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