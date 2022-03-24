import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTicketComponent } from './all-ticket/all-ticket.component';
import { CommentTicketComponent } from './comment-ticket/comment-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { LeaveFeedbackComponent } from './leave-feedback/leave-feedback.component';
import { LoginComponent } from './login/login.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "tickets", component: AllTicketComponent
  },
  {
    path: "create", component: CreateTicketComponent
  },
  {
    path: "edit/:id", component: EditTicketComponent
  },
  {
    path:"feedback/:id",component: LeaveFeedbackComponent
  },
  {
    path:"viewFeedback/:id",component:ViewFeedbackComponent
  },
  {
    path:"myTickets",component:MyTicketComponent
  },
  {
    path: "overview", component: TicketOverviewComponent,
    children: [
      {
        path: "comment/:id", component: CommentTicketComponent
      },
      {
        path: "history/:id", component: TicketHistoryComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
