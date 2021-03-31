import { User, Vehicle, Pickup } from "./index";

export interface Shipment {
    id: String;
    _id: String;
    code: String;
    courier: User;
    vehicle: Vehicle;
    schedule: Object;
    pickups: Array<Pickup>;
    status: String;
    remark: String;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Shipment {
    id: String;
    _id: String;
    code: String;
    courier: User;
    vehicle: Vehicle;
    schedule: Object;
    pickups: Array<Pickup>;
    status: String;
    remark: String;
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

