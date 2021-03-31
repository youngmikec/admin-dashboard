import { Pickup } from "./pickup";
import { Shipment } from "./shipment";
import { Ticket } from "./ticket";
import { User } from "./user";

export interface Rating {
    id:         String;
    _id:        String;
    star:	    Number;	
    subject:	"PICKUP" | "SHIPMENT";
    shipment:   Shipment;
    pickup: 	Pickup;
    ticket: 	Ticket;
    review:	    String;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Rating {
    id:         String;
    _id:        String;
    star:	    Number;	
    subject:	"PICKUP" | "SHIPMENT";
    shipment:   Shipment;
    pickup: 	Pickup;
    ticket: 	Ticket;
    review:	    String;
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