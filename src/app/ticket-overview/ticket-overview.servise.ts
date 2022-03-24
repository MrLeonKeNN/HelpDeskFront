import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
	providedIn: 'root'
})

export class TicketOverviewService {

	constructor(private httpclient: HttpClient) { }

	get(id: number) {
		return this.httpclient.get<any>(`http://localhost:4200/api/tickets/${id}`);
	}

	getAttacment(id: number, name: string) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		})
		return this.httpclient.get<Blob>(`http://localhost:4200/api/tickets/${id}/attachments/${name}`, { headers: headers, responseType: 'blob' as 'json', observe: 'response' });
	}
}