import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: 'root'
})

export class ViewFeedbackService {

   constructor(private http: HttpClient) { }
   getFeedback(id: number) {
      return this.http.get<any>(`http://localhost:4200/api/tickets/${id}/feedbacks`)
   }
}