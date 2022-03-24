import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  errorState:boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required,
  Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/),
  Validators.maxLength(20)]);
  matcher = new MyErrorStateMatcher();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit(): void {
    this.firstAut();
  }

  autorization() {
    this.form.patchValue({
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    })
    this.loginService.autorization(this.form).subscribe({
      next: () => this.router.navigate(["/tickets"]),
      error: (err) => this.errorState = true
      
    })
  }

 async firstAut() {
    this.loginService.firstAutorization().subscribe({
      next: () => this.router.navigate(["/tickets"]),
      error:()=> {}
    })
  }
}
