import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: 'root'
})

export class TableticketsService {

   constructor(private http: HttpClient) { }

   updateState(id: number, action: string) {
      return this.http.put<any>(`http://localhost:4200/api/tickets/${id}/${action}`, {})
   }

   getSortTicket(column: string, method: string, page: number, scope: string) {
      return this.http.get<any>(`http://localhost:4200/api/tickets/sort/${column}/${method}/${scope}/${page}`, {})
   }
   getCountTicket(page: number) {
      return this.http.get<any>(`http://localhost:4200/api/tickets/all/${page}`)
   }

   getCountsTicket() {
      return this.http.get<any>(`http://localhost:4200/api/tickets/count`)
   }

   search(page: number, word: string, scope: string) {
      return this.http.get<any>(`http://localhost:4200/api/tickets/search/${page}/${scope}/${word}`)
   }
}