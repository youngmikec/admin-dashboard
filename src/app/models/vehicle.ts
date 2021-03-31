import { User } from "./user";

export interface Vehicle {
    id?: string;
    _id?: string;
    name: string;	            //Vehicle name e.g 1450 (required)
    code: string;	            //Vehicle code unique e.g 1450 (required)
    description: string;	        //Vehicle description (required)
    plateNumber?: string;	    //Vehicle plate number (optional)
    volume: number;	            //Schedule volume in cubic meter is the Capacity for load
    mass: number;	            //Schedule mass in Kiloram is the Capacity for load
    make?: "TOYOTA" | "UGAMA" | "MEIYER" | "SIENNA" | "KINGO";	            //Vehicle make or manufacturer (optional)
    color?: string;             //Vehicle color (optional)
    photo?: string;	            //Vehicle photo url (optional)
    type: "BUS" | "CAR" | "TAXI" | "KEKE" | "BIKE" | "JEEP" | "TRUCK" | "AIRCRAFT";
    status?: string;	            //Vehicle record approval status (optional)
    remark: string;	            //Vehicle approval remark or any comment
    isHealthy?: boolean;	    //Vehicle is it healthy or brokendown (optional)
    isActive?: boolean;	    //Vehicle is it active or retired (optional)
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Vehicle {
    id?: string;
    _id?: string;
    name: string;	            //Vehicle name e.g 1450 (required)
    code: string;	            //Vehicle code unique e.g 1450 (required)
    description: string;	        //Vehicle description (required)
    plateNumber?: string;	    //Vehicle plate number (optional)
    volume: number;	            //Schedule volume in cubic meter is the Capacity for load
    mass: number;	            //Schedule mass in Kiloram is the Capacity for load
    make?: "TOYOTA" | "UGAMA" | "MEIYER" | "SIENNA" | "KINGO";	            //Vehicle make or manufacturer (optional)
    color?: string;             //Vehicle color (optional)
    photo?: string;	            //Vehicle photo url (optional)
    type: "BUS" | "CAR" | "TAXI" | "KEKE" | "BIKE" | "JEEP" | "TRUCK" | "AIRCRAFT";
    status?: string;	            //Vehicle record approval status (optional)
    remark: string;	            //Vehicle approval remark or any comment
    isHealthy?: boolean;	    //Vehicle is it healthy or brokendown (optional)
    isActive?: boolean;	    //Vehicle is it active or retired (optional)
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;

    constructor(fields: any) {
        for (let f of fields) {
            this[f] = fields[f];
        }
    }
}