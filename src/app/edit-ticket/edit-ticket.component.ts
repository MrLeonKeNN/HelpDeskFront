import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { CreateTicketService } from '../create-ticket/create-ticket.service';
import { EditTicketService } from './edit-ticket.service';

interface Name {
  name: string,
  validSize: boolean,
  validAttach: boolean
}

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {
  category = [
    'Application & Services',
    'Benefits & Paper Work',
    'Hardware & Software',
    'People Management',
    'Security & Access',
    'Workplaces & Facilities'
  ];

  urgency = [
    'Critical',
    'High',
    'Average',
    'Low'
  ]
  validSize = true;
  validAttach = true;
  todayDate: Date = new Date();
  fileToUpload: any = [];
  fileToUploadName: Array<Name> = [];
  deletaAtachment: any = [];
  id!: number;
  docName: any;
  tickets: any = {};

  @ViewChild('takeInput', { static: false })
  InputVar!: ElementRef;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(500)]),
    urgency: new FormControl('', [Validators.required]),
    desiredResolutionDate: new FormControl(''),
    comment: new FormControl('', [Validators.maxLength(500)]),
    state: new FormControl('')
  });

  constructor(private router: ActivatedRoute, private route: Router, private ticketService: CreateTicketService, private datePipe: DatePipe, private editService: EditTicketService) { }

  ngOnInit(): void {
    this.router.params.subscribe((param: Params) => {
      this.id = param["id"];
    })
    this.getTicket();
  }

  onclicSave(State: string) {
    this.form.value.state = State;
    let timeConvert = this.datePipe.transform(this.form.value.desiredResolutionDate, "yyyy-MM-dd")
    this.form.value.desiredResolutionDate = timeConvert;
    if (this.validAttach && this.validSize && this.form.valid) {
       this.editService.edtiTicket(this.form).subscribe({
        next: () => { this.fileUpload(), this.route.navigate(["tickets"]) }
      })
    }
  }

  getTicket() {
    this.editService.getTicket(this.id).subscribe({
      next: (data) => this.initParam(data)
    })
  }

  initParam(data: any) {
    this.tickets = data;
   
    this.form.patchValue({
      id: this.id,
      category: data.category,
      name: data.name,
      description: data.description,
      urgency: data.urgency,
      
    })

    if(data.desiredResolutionDate != null){
      this.form.patchValue({
        desiredResolutionDate: new Date(data.desiredResolutionDate)
      })
    }
   
  }

  removeAttachmentBack(name: string) {
    this.editService.removeAttachment(name, this.id).subscribe({
      next: () => this.removeArray(name)
    })
  }

  removeArray(name: string) {
    let a = this.tickets.attachmentName.findIndex((x: any) => x === name);
    this.tickets.attachmentName.splice(a, 1)
  }

  onFileSelect(event: any) {
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

      this.calculationValid();
    }
  }

  fileUpload() {
    if (this.fileToUpload.length === 0) {
      return;
    }

    const fn = new FormData();

    for (let i = 0; i < this.fileToUpload.length; i++) {
      fn.append('file', this.fileToUpload[i], this.fileToUploadName[i].name);
    }
    fn.append('ticketId', this.tickets.id)

    this.editService.fileUploade(fn).subscribe({
      next: () => console.log()
    });
  }

  deletAttachmentFront(name: string) {
    // console.log(this.InputVar.nativeElement.files.length);

    let a = this.fileToUpload.findIndex((x: any) => x.name === name);
    this.fileToUpload.splice(a, 1);
    this.fileToUploadName.splice(a, 1)

    let dt = new DataTransfer();
    let files = this.InputVar.nativeElement.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (a !== i)
        dt.items.add(file) // here you exclude the file. thus removing it.
    }

    this.InputVar.nativeElement.files = dt.files;
    this.calculationValid();
  }

  getAttachmentFront(name: string) {
    let a = this.fileToUpload.findIndex((x: any) => x.name === name);
    let file = this.fileToUpload[a];
    let fileName = this.fileToUploadName[a];


    console.log(file);

    FileSaver(file, fileName.name);
  }

  getAttachmentBack(id: any, name: string) {
    this.editService.getAttacment(id, name).subscribe(data => {
      let headers = data.headers.get('content-disposition');
      if (headers === null || data.body === null) {
        return;
      }
      this.docName = headers!.split(';')[1].split('filename')[1].split('=')[1].trim();

      let localName = this.docName.replaceAll("\"", "").replaceAll(" ", "")

      FileSaver(data.body, localName);
    })
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
