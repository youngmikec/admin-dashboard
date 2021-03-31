import { User } from "./user";
import { Pickup } from './pickup';

export interface Photo{
    id: string;
    _id: string;
    name: string;
    url: User;
    description: User;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Photo {
    id: string;
    _id: string;
    name: string;
    url: User;
    description: User;
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