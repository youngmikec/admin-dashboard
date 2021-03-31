import { Admin, Vehicle, User } from "./index";

export interface Bonus {
    id: String;
    _id: String;
    documentType: Object;
    type: "ASSET" | "PARTNER" | "ADMIN" | "VEHICLE" | "SALESORDER" | "PURCHASE";
    asset: Object;
    admin: Admin;
    partner: User;
    user: User;
    vehicle: Vehicle;
    saleOrder: Object;
    purchaseOrderId: Object;
    reference?: String;
    lastRenewal?: Date;
    nextRenewal?: Date;
    renewalBy?: Admin;
    amount?: Number;
    description: String;
    isRenewed?: Boolean;
    isValidity?: Boolean;
    createdBy?: User;
    createdAt?: Date;
    updatedBy?: User;
    updatedAt?: Date;
}

export class Bonus {

    id: String;
    _id: String;
    documentType: Object;
    type: "ASSET" | "PARTNER" | "ADMIN" | "VEHICLE" | "SALESORDER" | "PURCHASE";
    asset: Object;
    admin: Admin;
    partner: User;
    user: User;
    vehicle: Vehicle;
    saleOrder: Object;
    purchaseOrderId: Object;
    reference?: String;
    lastRenewal?: Date;
    nextRenewal?: Date;
    renewalBy?: Admin;
    amount?: Number;
    description: String;
    isRenewed?: Boolean;
    isValidity?: Boolean;
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