import { User } from "./user";

export interface Admin {
    id: string;
    _id: string;
    title?:	string;
    surname:	string;	
    firstName:	string;	
    middleName:	string;	
    lastName:	string;	
    gender:	    'F'|'M'|'O';	//User GENDER M-MALE, F-FEMALE, O-OTHER
    birthDate:	Date;	
    phone:	string;	
    phoneHome?:	string;
    address?:	string;
    email?:	string;	
    password?:	string;	
    country?: string;
    otp?:	string;	
    otpCount?:	Number;	
    otpAccess?:	Boolean;	
    role:	string;	    //ADMIN role is an array of permissions the office demands
    accessLevel:	Number;	    //ADMIN access level 0 - 9 Max. Zero implies No access
    status?:	string;
    lastLogin?:	Date;	
    currentLogin?:	Date;	
    lastIp:	string;	
    currentIp?:	string;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Admin{
    id: string;
    _id: string;
    title?:	string;
    surname:	string;	
    firstName:	string;	
    middleName:	string;	
    lastName:	string;	
    gender:	    'F'|'M'|'O';	//User GENDER M-MALE, F-FEMALE, O-OTHER
    birthDate:	Date;	
    phone:	string;	
    phoneHome?:	string;
    address?:	string;
    email?:	string;	
    password?:	string;	
    country?: string;
    otp?:	string;	
    otpCount?:	Number;	
    otpAccess?:	Boolean;	
    role:	string;	    //ADMIN role is an array of permissions the office demands
    accessLevel:	Number;	    //ADMIN access level 0 - 9 Max. Zero implies No access
    status?:	string;
    lastLogin?:	Date;	
    currentLogin?:	Date;	
    lastIp:	string;	
    currentIp?:	string;
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

