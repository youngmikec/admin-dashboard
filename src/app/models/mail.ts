export interface Mail { 
    id:             String;
    _id:            String;
    sender:	        String;
    recipient:	    String;
    message:	    String;
    direction:      "IN" | "OUT";
    status:	"QUEUED" | "FAILED" | "SENT" | "DELIVERED";
}

export class Mail { 
    id:             String;
    _id:            String;
    sender:	        String;
    recipient:	    String;
    message:	    String;
    direction:      "IN" | "OUT";
    status:	"QUEUED" | "FAILED" | "SENT" | "DELIVERED"; 

    constructor( fields: any ){
        for(let f of fields){
            this[f] = fields[f];
        }
    }
}