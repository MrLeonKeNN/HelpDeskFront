import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn:'root'
})

export class HistoryService{

    constructor(private http: HttpClient) { }

    getHistory(id:number, page:number){
       return this.http.get<any>(`http://localhost:4200/api/tickets/${id}/history/${page}`)
    }
}