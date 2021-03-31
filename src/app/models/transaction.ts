import { User } from "./user";

export class Transaction {
    id: string;
    _id: string;
    code: string;
    type: string;
    amount: string;
    charge: string;
    userFrom: string;
    userTo: string;
    walletFrom: string;
    walletTo: string;
    deposit: string;
    withdraw: string;
    hash: string;
    description: string;
    auditedBy: string;
    auditedDate: string;
    auditedRemark: string;
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


export interface Transaction {
    id: string;
    _id: string;
    code: string;
    type: string;
    amount: string;
    charge: string;
    userFrom: string;
    userTo: string;
    walletFrom: string;
    walletTo: string;
    deposit: string;
    withdraw: string;
    hash: string;
    description: string;
    auditedBy: string;
    auditedDate: string;
    auditedRemark: string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}
