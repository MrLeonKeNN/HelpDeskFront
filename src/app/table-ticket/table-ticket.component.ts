import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

import { TableticketsService } from './tableTickets.service';

@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.scss']
})
export class TableTicketComponent implements OnInit {

  text: string = "";
  tickets: any = [];
  count: number = 10;
  page: number = 1;
  scope: string = "ALL";
  canCreate!: boolean;
  pageIndex: any;

  isSort: boolean = false;
  sortByColumn: string = "";
  methodSort: string = "";
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private tableTicketService: TableticketsService, private router: Router) { }


  ngOnInit(): void {
    this.firstPage()
    this.notify.emit(this.canCreate);
  }

  sendTitle(): void {
    this.notify.emit(this.canCreate);
  }

  search(text: string) {
    console.log(text);


    this.pageIndex = 0;
    console.log(this.pageIndex);

    let textReplase = this.replaseAll(text);


    if (textReplase === "") {
      this.refresh();
    }
    else {
      this.tableTicketService.search(1, textReplase, this.scope).subscribe({
        next: (data) => { this.tickets = data, this.count = data.countTicket }
      })
    }
  }

  actionUpdate(action: string, id: number) {
    let actionLower: any = action.toLowerCase();
    let a: any = actionLower.replaceAll("_", " ").split(' ')[0];

    if (action === "Leave Feedback") {
      this.router.navigate(["/feedback", id]);
      return;
    }
    if (action === "View Feedback") {
      this.router.navigate(["/viewFeedback", id]);
      return;
    }

    this.tableTicketService.updateState(id, a).subscribe((data) => {
      this.refresh();
    });
  }

  firstPage() {
    this.tableTicketService.getCountTicket(1).subscribe({
      next: data => { this.init(data), this.count = data.countTicket, this.canCreate = data.canCreate, this.sendTitle() },
      error: (error) => {
        if (error.status == 403) {
          this.router.navigate(["/"])
        }
      }
    })
  }

  refresh() {
    if (this.isSort) {
      this.sort(this.methodSort, this.sortByColumn);
    } else if (this.text === "") {
      this.tableTicketService.getCountTicket(this.page).subscribe({
        next: (data) => { this.tickets = data, this.count = data.countTicket }
      })
    } else {
      this.tableTicketService.search(this.page, this.text, this.scope).subscribe({
        next: (data) => { this.tickets = data, this.count = data.countTicket }
      })
    }
    this.pageIndex = this.page - 1;
  }

  init(data: any) {
    this.tickets = data;
  }

  sort(method: string, column: string) {
    this.isSort = true;
    this.sortByColumn = column;
    this.methodSort = method;

    this.text = "";

    this.tableTicketService.getSortTicket(column, method, this.page, this.scope).subscribe({
      next: (data) => { this.tickets = data, this.text === "" }
    });
  }

  getLimitTicket(event: any) {
    this.page = event.pageIndex + 1;
    if (this.isSort) {
      this.sort(this.methodSort, this.sortByColumn);
    }
    else if (this.text === "") {
      this.tableTicketService.getCountTicket(event.pageIndex + 1).subscribe({
        next: (data) => this.tickets = data
      })
    }
    else {
      this.tableTicketService.search(event.pageIndex + 1, this.text, this.scope).subscribe({
        next: (data) => this.tickets = data
      })
    }

  }

  getCountPage() {
    this.tableTicketService.getCountsTicket().subscribe({
      next: (data) => this.count = data
    })
  }

  replaseAll(text: any) {
    let text2 = text.replace(".", "%2e")
    return text2.replaceAll("%", "%25")   // Процент
      .replaceAll(" ", "%20")   // Пробел
      .replaceAll("\t", "%20")  // Табуляция (заменяем на пробел)
      .replaceAll("\n", "%20")  // Переход строки (заменяем на пробел)
      .replaceAll("\r", "%20")  // Возврат каретки (заменяем на пробел)
      .replaceAll("!", "%21")   // Восклицательный знак
      .replaceAll("\"", "%22")  // Двойная кавычка
      .replaceAll("#", "%23")   // Октоторп, решетка
      .replaceAll("\\$", "%24") // Знак доллара
      .replaceAll("&", "%26")   // Амперсанд
      .replaceAll("'", "%27")   // Одиночная кавычка
      .replaceAll("\\(", "%28") // Открывающаяся скобка
      .replaceAll("\\)", "%29") // Закрывающаяся скобка
      .replaceAll("\\*", "%2a") // Звездочка
      .replaceAll("\\+", "%2b") // Знак плюс
      .replaceAll(",", "%2c")   // Запятая
      .replaceAll("-", "%2d")   // Дефис
      .replaceAll("\\.", "%2e") // Точка
      .replaceAll("/", "%2f")   // Слеш, косая черта
      .replaceAll(":", "%3a")   // Двоеточие
      .replaceAll(";", "%3b")   // Точка с запятой
      .replaceAll("<", "%3c")   // Открывающаяся угловая скобка
      .replaceAll("=", "%3d")   // Знак равно
      .replaceAll(">", "%3e")   // Закрывающаяся угловая скобка
      .replaceAll("\\?", "%3f") // Вопросительный знак
      .replaceAll("@", "%40")   // At sign, по цене, собачка
      .replaceAll("\\[", "%5b") // Открывающаяся квадратная скобка
      .replaceAll("\\\\", "%5c") // Одиночный обратный слеш '\'
      .replaceAll("\\]", "%5d") // Закрывающаяся квадратная скобка
      .replaceAll("\\^", "%5e") // Циркумфлекс
      .replaceAll("_", "%5f")   // Нижнее подчеркивание
      .replaceAll("`", "%60")   // Гравис
      .replaceAll("\\{", "%7b") // Открывающаяся фигурная скобка
      .replaceAll("\\|", "%7c") // Вертикальная черта
      .replaceAll("\\}", "%7d") // Закрывающаяся фигурная скобка
      .replaceAll("~", "%7e");  // Тильда
  }
}
