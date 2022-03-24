import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LeaveFeedbackService } from './leave-feedback.service';

@Component({
  selector: 'app-leave-feedback',
  templateUrl: './leave-feedback.component.html',
  styleUrls: ['./leave-feedback.component.scss']
})
export class LeaveFeedbackComponent implements OnInit {

  params: any = {};
  rate!: number;

  form: FormGroup = new FormGroup({
    rate: new FormControl(''),
    description: new FormControl(''),
    ticketId: new FormControl('')
  })

  constructor(private route: ActivatedRoute, private router: Router, private leavefeedbackService: LeaveFeedbackService) { }

  ngOnInit(): void {
    this.success();
    this.route.params.subscribe((params: Params) => {
      this.params = params;
    })
  }

  success() {
    this.leavefeedbackService.autorization().subscribe({
      error: (error) => {
        if (error.status === 403) {
          this.router.navigate(["/"])
        }
      }
    })
  }

  sizeStar(size: any) {
    this.rate = size;
  }

  addFeedback() {
    this.form.patchValue({
      rate: this.rate,
      ticketId: this.params.id
    })

    this.leavefeedbackService.addFeedback(this.form).subscribe((data) => {
      this.router.navigate(['/overview/history/', this.params.id])
    })
  }

}
