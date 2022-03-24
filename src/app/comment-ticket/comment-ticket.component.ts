import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ExchangeService } from '../exchange.service';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment-ticket',
  templateUrl: './comment-ticket.component.html',
  styleUrls: ['./comment-ticket.component.scss']
})
export class CommentTicketComponent implements OnInit {

  page: number = 1;
  id!: number;
  comments: any = [];

  constructor(private exchangeService: ExchangeService, private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param["id"];
      this.exchangeService.changedComponentName(param);
      this.getComment();
    })

  }

  form: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
    ticketId: new FormControl('')
  })

  addComment(text: string) {
    this.form.patchValue({
      ticketId: this.id
    })

    this.commentService.saveComment(this.form).subscribe({
      next: () => {
        this.getComment();
        this.form.reset();
      }
    });
  }

  getComment() {
    this.commentService.getComments(this.id, 1).subscribe({
      next: (data) => this.comments = data
    })
  }

  getMoreComment() {
    this.page += 1;
    this.commentService.getComments(this.id, this.page).subscribe({
      next: (data) => this.injectPage(data)
    })
  }

  injectPage(data: any) {
    this.comments = this.comments.concat(data);
  }

}
