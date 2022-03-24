import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ExchangeService } from '../exchange.service';
import { TicketOverviewService } from './ticket-overview.servise';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss']
})
export class TicketOverviewComponent implements OnInit {

  isDraft: boolean = false;
  isDone: boolean = false;
  isLeave: boolean = false;
  isView: boolean = false;
  params!: number;
  ticket: any = {};
  docName: any;

  constructor(private exchangeService: ExchangeService, private ticketService: TicketOverviewService, private router: Router) { }

  ngOnInit(): void {
    const subscription = this.exchangeService.pageNameChange$.subscribe(
      newPageName => {
        this.params = newPageName.id;
        subscription.unsubscribe();
        this.getTicket(newPageName.id);
      });
  }

  getTicket(id: number) {
    this.ticketService.get(id).subscribe({
      next: (data) => this.init(data),
      error: (error) => {
        if (error.status === 404 || error.status === 403 || error.status === 400) {
          this.router.navigate(["/"])
        }
      }
    })
  }

  init(data: any) {
    this.ticket = data;

    this.isDraft = this.ticket.state === 'Draft';
    this.isDone = this.ticket.state === "Done";
    this.ticket.actions.forEach((element: any) => {

      if (element === "Leave Feedback") {
        this.isLeave = true;
      }

      if (element === "Vies Feedback") {
        this.isView = true;
      }
    });
  }

  getAttachment(id: any, name: string) {
    this.ticketService.getAttacment(id, name).subscribe(data => {
      let headers = data.headers.get('content-disposition');
      if (headers === null || data.body === null) {
        return;
      }
      this.docName = headers!.split(';')[1].split('filename')[1].split('=')[1].trim();
      console.log(this.docName);
      let localName = this.docName.replaceAll("\"", "").replaceAll(" ", "")
      console.log(localName);
      FileSaver(data.body, localName);
    })
  }

}