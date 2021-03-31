import { Shipment } from "./shipment";
import { User } from "./user";

export class Track {
    _id: string;
    id: string;
    courier: User;
    terminal: any;
    shipment: Shipment;
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

export interface Track {
    _id: string;
    id: string;
    courier: User;
    terminal: any;
    shipment: Shipment;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}
