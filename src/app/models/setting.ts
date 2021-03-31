import { User } from "./user";

export class Setting {
    id: string;
    _id: string;
    type: "SCHEDULE"|"SETUP"|"BILLING"|"PICKUP"|"APP"|"TRANSACTION";
    isPublic: Boolean;
    name: string;
    value: string;
    description: string;
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

export interface Setting {
    id: string;
    _id: string;
    type: "SCHEDULE"|"SETUP"|"BILLING"|"PICKUP"|"APP"|"TRANSACTION";
    isPublic: Boolean;
    name: string;
    value: string;
    description: string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}
