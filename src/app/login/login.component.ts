import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  submitted = false;
  toaster: ToastrService;
  loginFormData = {
    email: '',
    password: '',
  };
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    toaster: ToastrService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {
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

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().user.role;
      this.navigateToDashboard();
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  doLogin(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.toaster.error('All fields are required.');
      return;
    }

    const { email, password } = this.loginFormData;
    this.authService.login(email, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().user.role;
        this.navigateToDashboard();
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.toaster.error(error.error.message);
        this.isLoginFailed = true;
      }
    );
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
