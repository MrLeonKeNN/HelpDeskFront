import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AllTicketService {

    constructor(private httpclient: HttpClient) { }

    logout() {
        return this.httpclient.post<any>("http://localhost:4200/api/logout", {});
    }
}