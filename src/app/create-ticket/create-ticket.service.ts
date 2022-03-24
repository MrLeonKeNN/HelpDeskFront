import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
	providedIn:'root'
})

export class CreateTicketService{
    
    constructor(private httpclient:HttpClient){}

    createTicket(form:FormGroup){
        return this.httpclient.post<any>("http://localhost:4200/api/tickets",{...form.value});
    }

    fileUploade(file:any){
        return this.httpclient.post<any>("http://localhost:4200/api/tickets/attachments",file,{
            reportProgress:true,
            observe: 'events'
        });
    }
}