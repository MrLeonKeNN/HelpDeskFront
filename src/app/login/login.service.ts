import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn:'root'
})

export class LoginService{

    constructor(private httpclient:HttpClient){}

    autorization(form:any){
		return this.httpclient.post<any>('http://localhost:4200/api/login',{...form.value})
	}

	firstAutorization(){
		return this.httpclient.get<any>('http://localhost:4200/api/login/success')
	}
}
