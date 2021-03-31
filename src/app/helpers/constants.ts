
export const FREEXIT = {
    ADMIN: "5a51bc91860d8b5ba000a000",
    USERID: "5a51bc91860d8b5ba0001000",
    USERID2: "5a51bc91860d8b5ba0002000",
    WALLET_DEBIT: "1234ABCDEF",
    WALLET_CREDIT: "1000ABCDEF",
    WALLET_AMOUNT: 1000000000,

};

export const TRANSACTION = {
    DEPOSIT: "D", // Crediting by Merchant or Customer
    WITHDRAW: "W", // Cashing out by Merchant or Customer
    TRANSFER: "T", // Spending within Ewallet System between Mechant and Cutsomer
};

export const PAYMENT = {
    GATEWAY: {
        FLUTTERWAVE: "FLUTTERWAVE",
        INTERSWITCH: "INTERSWITCH",
        UNIONBANK: "UNIONBANK",
        PAYSTACK: "PAYSTACK",
        STRIPE: "STRIPE",
        PAYPAL: "PAYPAL",
        GOOGLE_WALLET: "GOOGLE_WALLET",
        FREEXIT_WALLET: "FREEXIT_WALLET",
    },
    METHOD: {
        GATEWAY: "GATEWAY",
        POS: "POS",
        CASH: "CASH",
        CHEQUE: "CHEQUE",
        TRANSFER: "TRANSFER",
        USSD: "USSD",
        WALLET: "WALLET",
    },
    STATUS: { PENDING: "PENDING", SUCCESSFUL: "SUCCESSFUL", FAIL: "FAIL" },

};

export const EMAIL = {
    ADMIN: "appcalypsounltd@gmail.com",
    CONTACT: "appcalypsounltd@gmail.com",
    USER: "appcalypsounltd@outlook.com",
};

export const GENDER = {
    MALE: "M",
    FEMALE: "F",
    OTHER: "O",
};

export const USER_TYPE = {
    SENDER: "SENDER",
    COURIER: "COURIER",
};

export const APPROVAL_STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    SUSPENDED: "SUSPENDED",
};

export const DATABASE = {
    TABLES: ["ADMIN", "PARTNER", "OWNER", "VEHICLE", "ASSET"],
    PRELOAD_TABLE_DATA: { TRUE: true, FALSE: false, DEFAULT: false },
    RECORD_STATUS: {
        PENDING: "PENDING",
        REJECTED: "REJECTED",
        ACKNOWLEDGED: "ACKNOWLEDGED",
        APPROVED: "APPROVED",
        AUTHORIZED: "AUTHORIZED",
        AUDITED: "AUDITED",
        CLOSED: "CLOSED",
    },
    BASE_ID: {
        ADMIN: "5a51bc91860d8b5ba",
        USER: "5b51bc91860d8b5bb",
        SETTING: "5051bc91860d8b505",
    },
    OPTIONS: {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
        autoIndex: true,
        minimize: false,
        versionKey: false,
        toJSON: {
            virtuals: true,
            // eslint-disable-next-line object-shorthand
            transform: function (doc, ret) {
                ret.id = ret._id;
                // ret.createdAt = ret.created_at;
                // ret.updatedAt = ret.updated_at;
                delete ret._id;
                delete ret.updated_at;
                delete ret.created_at;
                delete ret.__v;
            },
        },
        toObject: { virtuals: true },
    },
};

export const JWT = {
    saltRounds: 2,
    jwtSecret: "Moi-moiSoupe-it`s-a_dragonEGG-secret",
    tokenExpireTime: "72h",
};

export const SMS = {
    FREEXIT_SMS_SENDER: "+12342175385", // "0700FREEXITMASS",
};

export const API = {
    URL: "https://freexitnow.com",
};

export const USER_ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
    COURIER: "COURIER",
};

export const TRANSPORT_DOC = {
    LOGO: "LOGO",
    DOCUMENT: "DOCUMENT",
    OTHERS: "OTHERS",
    INSURANCE: "INSURANCE",
    INSURANCE_PLACE: "INSURANCE_PLACE",
    PERMIT: "PERMIT",
    OWNERSHipv4: "OWNERSHIP",
    VEHICLE: "VEHICLE",
};

export const INPUT_TYPE = {
    TEXT: "TEXT",
    TEXTAREA: "TEXTAREA",
    DROPDOWN: "DROPDOWN",
    FILE: "FILE",
    DATETIME: "DATETIME",
    LOCATION: "LOCATION",
    SELECTLIST: "SELECTLIST",
    RADIOBUTTON: "RADIOBUTTON",
    CHECKBOXES: "CHECKBOXES",
    DATE: "DATE",
    TIME: "TIME",
    NUMBER: "NUMBER",
};

export const ISSUE_PRIORITY = {
    EMERGENCY: "P1",
    HIGH: "P2",
    NORMAL: "P3",
    LOW: "P4",
};

export const PARCEL = {
    SCHEDULE_STATUS: { PENDING: "PENDING"},
    RECIPIENT_TYPE: { INDIVIDUAL: "INDIVIDUAL", ORGANIZATION: "ORGANIZATION" },
    ROUTING_STATUS: { STORE: "STORE", TRANSIT: "TRANSIT" },
    DELIVERY_STATUS: { PENDING: "PENDING", PACKAGED: "PACKAGED", SHIPPED: "SHIPPED", ARRIVED: "ARRIVED", DELIVERED: "DELIVERED", DISPATCHED: "DISPATCHED" },
    DELIVERY_TYPE: { HOME: "HOME", TERMINAL: "TERMINAL" },
    BILLING_TYPE: { PRE_PAID: "PRE_PAID", POST_PAID: "POST_PAID", DEDICATED: "DEDICATED" },
    PICKUP_STATUS: {
        PENDING: "PENDING",
        DISPATCH: "DISPATCH",
        PACKAGE: "PACKAGE",
        SHIP: "SHIP",
        DISAPPROVE: "DISAPPROVE",
        DELIVER: "DELIVER",
        CANCEL: "CANCEL",
        DISPUTE: "DISPUTE",
        CONFIRM: "CONFIRM",
    },
    FRAGILITY: { ROBUST: "ROBUST", FRAGILE: "FRAGILE" },
    PERISHABILITY: { NONPERISHABLE: "NONPERISHABLE", PERISHABLE: "PERISHABLE" },
    COMBUSTIBILITY: { NONCOMBUSTIBLE: "NONCOMBUSTIBLE", COMBUSTIBLE: "COMBUSTIBLE" },
    ODIFEROUSNESS: { ODOROUS: "ODOROUS", ODORLESS: "ODORLESS" },
    SOLIDITY: { SOLID: "SOLID", LIQUID: "LIQUID" },
    UNIQUENESS: { ORDINARY: "ORDINARY", EXTRAORDINARY: "EXTRAORDINARY" },
};


export const VEHICLE = {
    TYPE: {
        BUS: "BUS",
        CAR: "CAR",
        TAXI: "TAXI",
        KEKE: "KEKE",
        BIKE: "BIKE",
        JEEP: "JEEP",
        TRUCK: "TRUCK",
        AIRCRAFT: "AIRCRAFT"
    },
    MAKE: {
        TOYOTA: "TOYOTA",
        UGAMA: "UGAMA",
        MEIYER: "MEIYER",
        SIENNA: "SIENNA",
        KINGO: "KINGO",
    },
};
