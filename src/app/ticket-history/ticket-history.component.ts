import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExchangeService } from '../exchange.service';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss']
})
export class TicketHistoryComponent implements OnInit {

  id!: number;
  page: number = 1;
  history: any = [];

  constructor(private exchangeService: ExchangeService, private route: ActivatedRoute, private historyService: HistoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param["id"];
      this.exchangeService.changedComponentName(param);
      this.getHistory(param["id"]);
    })
  }

  getMoreHistory() {
    this.page += 1;
    this.historyService.getHistory(this.id, this.page).subscribe({
      next: (data) => this.history = this.history.concat(data)
    })
  }

  getHistory(id: number) {
    this.historyService.getHistory(id, 1).subscribe({
      next: (data) => this.history = data
    })
  }
}
