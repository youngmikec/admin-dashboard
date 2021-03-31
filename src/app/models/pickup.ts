import { User } from "./user";

export interface Pickup{
    id?: string;
    _id?: string;
    code: string;
    sender:	string;	
    parcels: Array<any>;
    terminal?: string;
    county: string;  //LGA id
    state: string;   // state id
    country: string;	
    address: String; // pickup address
    status?:	String;    //Pickup status "PENDING|PICKEDUP|SHIPPED|CANCELLED|DECLINED" (required)
    remark:	String;	
    declinedAt?:	Date;	//pmlpickup declined date
    declinedBy?: string
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}


export class Pickup {
    id?: string;
    _id?: string;
    code: string;
    sender:	string;	
    parcels: Array<any>;
    terminal?: string;
    county: string;  //LGA id
    state: string;   // state id
    country: string;	
    address: String; // pickup address
    status?:	String;    //Pickup status "PENDING|PICKEDUP|SHIPPED|CANCELLED|DECLINED" (required)
    remark:	String;	
    declinedAt?:	Date;	//pmlpickup declined date
    declinedBy?: string
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;

    constructor(fields: any){
        for(let f of fields){
            this[f] = fields[f]
        }
    }
}