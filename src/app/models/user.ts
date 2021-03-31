export interface User{
    id?:        string;
    _id?:       string;
    title:	    string;
    surname:	string;	
    firstName:	string;	
    middleName:	string;	
    lastName:	string;	
    gender:	    'F'|'M'|'O';	//User GENDER M-MALE, F-FEMALE, O-OTHER
    birthDate:	Date;   //User date of birth (required)
    address:	string;	//User dormiciary address of origin (required)
    state?:	    string;	//User state of coverage ObjectId
    county?:	string;	//User county of coverage ObjectId
    country?:	string;	//User country of coverage
    type?: any,
    phone?: any,
    email?: any,
    password?: string;
    guarantor?: any,
    guarantorAddress?: any,
    guarantorPhone?: any,
    kin?: any,
    kinAddress?: any,
    kinPhone?: any,
    accessLevel?: any,
    accountName?: any,
    accountNumber?: any,
    status?: any,
    balance?: any,
    wallet?: any,
    coverage?: any,
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
    
}

export class User {
    id?:        string;
    _id?:       string;
    title:	    string;
    surname:	string;	
    firstName:	string;	
    middleName:	string;	
    lastName:	string;	
    gender:	    'F'|'M'|'O';	//User GENDER M-MALE, F-FEMALE, O-OTHER
    birthDate:	Date;   //User date of birth (required)
    address:	string;	//User dormiciary address of origin (required)
    state?:	    string;	//User state of coverage ObjectId
    county?:	string;	//User county of coverage ObjectId
    country?:	string;	//User country of coverage
    type?: any;
    phone?: any;
    email?: any;
    password?: string;
    guarantor?: any;
    guarantorAddress?: any;
    guarantorPhone?: any;
    kin?: any;
    kinAddress?: any;
    kinPhone?: any;
    accessLevel?: any;
    accountName?: any;
    accountNumber?: any;
    status?: any;
    balance?: any;
    wallet?: any;
    coverage?: any;
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