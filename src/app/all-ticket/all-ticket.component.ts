import { AfterViewChecked, AfterViewInit, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableTicketComponent } from '../table-ticket/table-ticket.component';
import { TableticketsService } from '../table-ticket/tableTickets.service';
import { AllTicketService } from './all-ticket.service';

@Component({
  selector: 'app-all-ticket',
  templateUrl: './all-ticket.component.html',
  styleUrls: ['./all-ticket.component.scss']
})

export class AllTicketComponent implements OnInit {

  tickets: any;
  canCreate: boolean = true;

  constructor(private allTicketService: AllTicketService, private router: Router) { }


  ngOnInit(): void { }

  getChildTitle(title: boolean) {
    if (title == undefined) {
      return;
    }
    this.canCreate = title;
  }

  logout() {
    this.allTicketService.logout().subscribe({
      next: () => this.router.navigate(["/"])
    });
  }

}
