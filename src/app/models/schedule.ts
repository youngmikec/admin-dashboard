import { Country } from "./country";
import { County } from "./county";
import { State } from "./state";
import { User } from "./user";

export interface Schedule {
    id:             String;
    _id:            String;
    code:	        String;
    courier:        User;
    terminalFrom:   any;
    stateFrom:      State;
    countyFrom:     County;
    countryFrom:    Country;
    terminalTo:     any;
    stateTo:        State;
    countyTo:       County;
    countryTo:      Country;
    boardingDate:	Date;
    isFull:	        Boolean;
    vehicle:	    String;
    volume: 	    Number;
    mass:	        Number;
    description:	String;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Schedule {
    id:             String;
    _id:            String;
    code:	        String;
    courier:        User;
    terminalFrom:   any;
    stateFrom:      State;
    countyFrom:     County;
    countryFrom:    Country;
    terminalTo:     any;
    stateTo:        State;
    countyTo:       County;
    countryTo:      Country;
    boardingDate:	Date;
    isFull:	        Boolean;
    vehicle:	    String;
    volume: 	    Number;
    mass:	        Number;
    description:	String;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;

    constructor( fields: any ){
        for(let f of fields){
            this[f] = fields[f];
        }
    }
}