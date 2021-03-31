import { User } from "./user";
import { Pickup } from './pickup';

export interface Parcel{
    id: string;
    _id: string;
    code: string;
    name: string;
    sender: User;
    recipient: User;
    courier: User;
    urgency?: number;
    distance?: number ;
    mass?: number;
    volume?: number;
    worth: number;
    isFragile: boolean;
    isPerishable: boolean;
    isCombustible: boolean;
    isOdiferous: boolean;
    isLiquid: boolean;
    isUnique: boolean;
    description: string;
    deliveryType: string;
    terminalFrom:	string;
    stateFrom:	string;
    countyFrom:	string;
    countryFrom: string;
    terminalTo:	string;
    stateTo:	string;
    countyTo:	string;
    countryTo:	string;
    deliveryAddress: string;
    travelHour: number;
    departureDate: Date;
    expectedDate: Date;
    // billingType: ['PRE_PAID'; Validators.required];
    costEstimate: number;
    costPayable: number;
    paymentMethod: string;
    paymentStatus: string;
    paymentGateway: string;
    identification?: string;
    remark: string;
    transaction?: string; // Transaction model
    pickupDate?:	Date;	
    shippedDate?:	Date;
    deliveredDate?:	Date;
    returnAddress?: string;
    deliveryStatus?:	string;
    isReturned?: boolean;
    pickup?: Pickup;    
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Parcel {
    id: string;
    _id: string;
    code: string;
    name: string;
    sender: User;
    recipient: User;
    courier: User;
    urgency?: number;
    distance?: number ;
    mass?: number;
    volume?: number;
    worth: number;
    isFragile: boolean;
    isPerishable: boolean;
    isCombustible: boolean;
    isOdiferous: boolean;
    isLiquid: boolean;
    isUnique: boolean;
    description: string;
    deliveryType: string;
    terminalFrom:	string;
    stateFrom:	string;
    countyFrom:	string;
    countryFrom: string;
    terminalTo:	string;
    stateTo:	string;
    countyTo:	string;
    countryTo:	string;
    deliveryAddress: string;
    travelHour: number;
    departureDate: Date;
    expectedDate: Date;
    // billingType: ['PRE_PAID'; Validators.required];
    costEstimate: number;
    costPayable: number;
    paymentMethod: string;
    paymentStatus: string;
    paymentGateway: string;
    identification?: string;
    remark: string;
    transaction?: string; // Transaction model
    pickupDate?:	Date;	
    shippedDate?:	Date;
    deliveredDate?:	Date;
    returnAddress?: string;
    deliveryStatus?:	string;
    isReturned?: boolean;
    pickup?: Pickup;
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