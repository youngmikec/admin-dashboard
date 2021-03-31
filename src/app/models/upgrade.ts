import { User } from "./index";

export interface Upgrade {
    id?: string;
    _id?: string;
    user: User;
    upgraded: Boolean;
    remark?: string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Upgrade {
    id?: string;
    _id?: string;
    user: User;
    upgraded: Boolean;
    remark?: string;
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