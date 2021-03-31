import { User } from "./user";

export class Notification {
    id: string;
    _id: string;
    type: "PICKUP"|"DELIVERY"|"CREDIT"|"CASHOUT";
    isRead: Boolean;
    title: string;
    message: string;
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

export interface Notification {
    id: string;
    _id: string;
    type: "PICKUP"|"DELIVERY"|"CREDIT"|"CASHOUT";
    isRead: Boolean;
    title: string;
    message: string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}
