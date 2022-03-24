import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { CreateTicketService } from './create-ticket.service';

interface Name {
  name: string,
  validSize: boolean,
  validAttach: boolean
}

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  @ViewChild('takeInput', { static: false })
  InputVar!: ElementRef;

  reset() {
    this.InputVar.nativeElement.value = "";
    this.fileToUploadName = [];
    this.fileToUpload = [];
    this.validSize = true;
    this.validAttach = true;
  }

  category = [
    'Application & Services',
    'Benefits & Paper Work',
    'Hardware & Software',
    'People Management',
    'Security & Access',
  ];

  urgency = [
    'Critical',
    'High',
    'Average',
    'Low'
  ]

  validAttach: boolean = true;
  validSize: boolean = true;
  todayDate: Date = new Date();
  fileToUpload: any = [];
  fileToUploadName: Array<Name> = [];
  src: any;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(500)]),
    urgency: new FormControl('', [Validators.required]),
    desiredResolutionDate: new FormControl(''),
    comment: new FormControl('', [Validators.maxLength(500)]),
    state: new FormControl('')
  });

  constructor(private router: Router, private ticketService: CreateTicketService, private datePipe: DatePipe) { }

  ngOnInit(): void { }

  onclicSave(State: string) {
    this.form.value.state = State;
    let timeConvert = this.datePipe.transform(this.form.value.desiredResolutionDate, "yyyy-MM-dd")
    this.form.value.desiredResolutionDate = timeConvert;
    if (this.validAttach && this.validSize && this.form.valid) {
      this.ticketService.createTicket(this.form).subscribe({
        next: (data) => { this.fileUpload(data), this.router.navigate(["/tickets"]); }
      })
    }
  }


  onFileSelect(event: any) {
    this.validSize = true;
    this.validSize = true;

    for (let i = 0; i < event.target.files.length; i++) {
      let validCurrentSize = true;
      let validCurrentAttach = true;
      if (event.target.files[i].size <= 5242880) {

      } else {
        validCurrentSize = false;
      }

      let validName = event.target.files[i].name.split(".").pop();
      if (validName === "pdf" || validName === "doc" || validName === "docx" || validName === "png" || validName === "jpeg" || validName === "jpg") {
      } else {
        validCurrentAttach = false
      }
      this.fileToUpload.push(event.target.files[i]);
      this.fileToUploadName.push({
        name: event.target.files[i].name,
        validAttach: validCurrentAttach,
        validSize: validCurrentSize
      })
      this.calculationValid()
    }
  }

  fileUpload(data: any) {

    if (this.fileToUpload.length === 0) {
      return;
    }
    if (this.validAttach && this.validSize) {
      const fn = new FormData();

      for (let i = 0; i < this.fileToUpload.length; i++) {

        fn.append('file', this.fileToUpload[i], this.fileToUploadName[i].name);
      }
      fn.append('ticketId', data)

      this.ticketService.fileUploade(fn).subscribe({});
    }
  }

  deletAttachment(name: string) {
    console.log(this.InputVar.nativeElement.files.length);

    let a = this.fileToUpload.findIndex((x: any) => x.name === name);
    this.fileToUpload.splice(a, 1);
    this.fileToUploadName.splice(a, 1)

    let dt = new DataTransfer();
    let files = this.InputVar.nativeElement.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (a !== i)
        dt.items.add(file)
    }

    this.InputVar.nativeElement.files = dt.files
    this.calculationValid()

  }

  getAttachment(name: string) {
    let a = this.fileToUpload.findIndex((x: any) => x.name === name);
    let file = this.fileToUpload[a];
    let fileName = this.fileToUploadName[a];

    FileSaver(file, fileName.name);
  }

  calculationValid() {
    this.validAttach = true;
    this.validSize = true;
    for (let i = 0; i < this.fileToUploadName.length; i++) {
      if (!this.fileToUploadName[i].validAttach) {
        this.validAttach = false;
      }
      if (!this.fileToUploadName[i].validSize) {
        this.validSize = false;
      }
    }
  }
}

