import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllTicketComponent } from './all-ticket/all-ticket.component';
import { TableTicketComponent } from './table-ticket/table-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { CommentTicketComponent } from './comment-ticket/comment-ticket.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { LeaveFeedbackComponent } from './leave-feedback/leave-feedback.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllTicketComponent,
    TableTicketComponent,
    CreateTicketComponent,
    TicketOverviewComponent,
    EditTicketComponent,
    TicketHistoryComponent,
    CommentTicketComponent,
    ViewFeedbackComponent,
    LeaveFeedbackComponent,
    MyTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatPaginatorModule,
    NgbModule
  ],
  providers: [MatDatepickerModule,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
