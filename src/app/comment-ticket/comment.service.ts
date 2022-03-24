import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CommentService {

    constructor(private http: HttpClient) { }

    getComments(id: number, page: number) {
        return this.http.get<any>(`http://localhost:4200/api/tickets/${id}/comments/${page}`)
    }

    saveComment(form: any) {
        return this.http.post<any>(`http://localhost:4200/api/tickets/comments`, { ...form.value })
    }
}