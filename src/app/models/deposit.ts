import{ User } from './user';

export interface Deposit {
    id: string;
    _id: string;
    code:	string;	
    type: "CREDIT" | "WITHDRAW" | "TRANSFER";
    amount:	string;
    description?:	string;	
    userTo:	User;           //Deposit Wallet/user to be credited ["MWA(Credit)", "USERWALLET"]
    walletTo:	string;     //Deposit Wallet/user to be debited ["MWA(Debit)", "USERWALLET"]
    narration?:	String	
    status: "SUCCESSFUL" | "PENDING" | "FAIL";  //Deposit status ["SUCCESSFUL", "PENDING", "FAIL"]
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Deposit {
    id: string;
    _id: string;
    code:	string;	
    type: "CREDIT" | "WITHDRAW" | "TRANSFER";
    amount:	string;
    description?:	string;	
    userTo:	User;           //Deposit Wallet/user to be credited ["MWA(Credit)", "USERWALLET"]
    walletTo:	string;     //Deposit Wallet/user to be debited ["MWA(Debit)", "USERWALLET"]
    narration?:	String	
    status: "SUCCESSFUL" | "PENDING" | "FAIL";  //Deposit status ["SUCCESSFUL", "PENDING", "FAIL"]
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