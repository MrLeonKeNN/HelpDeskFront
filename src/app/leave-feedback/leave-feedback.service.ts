import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn:'root'
})

export class LeaveFeedbackService{

    constructor(private httpclient:HttpClient){}

    addFeedback(form:any){
        return this.httpclient.post(`http://localhost:4200/api/tickets/feedbacks`,{...form.value})
    }

    autorization(){
		return this.httpclient.get<any>('http://localhost:4200/api/login/success')
	}

}