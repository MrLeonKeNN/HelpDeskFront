import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn:'root'
})

export class EditTicketService{
    
    constructor(private httpclient:HttpClient){}

    getTicket(id:number){
        return this.httpclient.get<any>(`http://localhost:4200/api/tickets/${id}`);
    }

    edtiTicket(form:any){
        return this.httpclient.put<any>(`http://localhost:4200/api/tickets`,{...form.value});
    }

    removeAttachment(name:string, id:number){
        return this.httpclient.delete<any>(`http://localhost:4200/api/tickets/${id}/attachments/${name}`);
    }

    fileUploade(file:any){
        return this.httpclient.post<any>("http://localhost:4200/api/tickets/attachments",file,{
            reportProgress:true,
            observe: 'events'
        });
    }

    getAttacment(id:number,name:string){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		})
		return	this.httpclient.get<Blob>(`http://localhost:4200/api/tickets/${id}/attachments/${name}`,{headers:headers,responseType:'blob' as 'json',observe: 'response'});
	   }

}