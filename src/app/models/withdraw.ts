import { User } from "./user"

export interface Withdraw {
    id: string;
    _id: string;
    code:	string;	
    amount:	string;	
    description:	string;	
    userFrom:	User;	        //Withdraw Wallet/user to be debited ["MWA(Debit)", "USERWALLET"]
    walletFrom:	string;	        //Withdraw Wallet/user to be debited ["MWA(Debit)", "USERWALLET"]
    narration:	string;	
    status:	"SUCCESSFUL" | "PENDING" | "FAIL";
    withdraw?:	string;	
    charge:	Number;
    bankName:	string;
    bankUserNumber:	string;
    bankUserName:	String
    remark: string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Withdraw {
    id: string;
    _id: string;
    code:	string;	
    amount:	string;	
    description:	string;	
    userFrom:	User;	        //Withdraw Wallet/user to be debited ["MWA(Debit)", "USERWALLET"]
    walletFrom:	string;	        //Withdraw Wallet/user to be debited ["MWA(Debit)", "USERWALLET"]
    narration:	string;	
    status:	"SUCCESSFUL" | "PENDING" | "FAIL";
    withdraw?:	string;	
    charge:	Number;
    bankName:	string;
    bankUserNumber:	string;
    bankUserName:	String
    remark: string;
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