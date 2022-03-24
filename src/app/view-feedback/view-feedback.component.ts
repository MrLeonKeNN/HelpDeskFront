import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewFeedbackService } from './viewFeedback.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss']
})
export class ViewFeedbackComponent implements OnInit {


  feedback: any = {}
  params: any = {};
  test: Array<number> = [1, 2]
  rate!: number;
  feedbackNotFound = false;
  feedbackRateOn: Array<number> = [];

  form: FormGroup = new FormGroup({
    rate: new FormControl(''),
    text: new FormControl(''),
    ticketId: new FormControl('')
  })

  constructor(private route: ActivatedRoute, private router: Router, private feedbackService: ViewFeedbackService) { }

  ngOnInit(): void {
    console.log(document.referrer)
    this.route.params.subscribe((params: Params) => {
      this.params = params;
    })
    this.feedbackService.getFeedback(this.params["id"]).subscribe({
      next: (data) => {
        this.feedback = data;
        this.feedbackRateOn = Array(data.rate).fill(0).map((x, i) => i);
        this.feedbackNotFound = true;
      },
      error: (error) => {
        if (error.status === 403) {
          this.router.navigate(["/"])
        }
        if (error.status === 404) {
          this.feedbackNotFound = false;
        }
      }
    })
  }

  sizeStar(size: any) {
    this.rate = size;
  }
}
