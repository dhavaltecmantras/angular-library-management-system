import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  submitted = false;
  toaster: ToastrService;
  constructor(private formBuilder: FormBuilder, toaster: ToastrService) {
    this.toaster = toaster;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  doLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.toaster.error('All fields are required.');
      return;
    }
  }
}
