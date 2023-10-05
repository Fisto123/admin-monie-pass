import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { loginModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showpassword: boolean = true;
  showLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.reactiveForm();
    this.auth.isUserLoggedIn()
      ? this.router.navigate(['dashboard'])
      : this.router.navigate(['login']);
  }

  reactiveForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get fc() {
    return this.loginForm.controls;
  }
  onSubmit(form: loginModel) {
    this.showLoading = true;
    this.spinner.show();
    this.auth.login(form).subscribe(
      (res: any) => {
        const JwtHelperService2 = new JwtHelperService();
        const user = JwtHelperService2.decodeToken(res.token);
        if (res.token && user.role !== 'client') {
          this.showLoading = false;
          this.spinner.hide();
          this.toastr.success('Success', 'Login successful', {
            timeOut: 3000,
          });
          this.auth.setTokenToLocalStorage(res.token);
          this.router.navigate(['dashboard']);
        } else {
          this.showLoading = false;
          this.toastr.error(
            'Error',
            res.errorReason || 'You are not authorized',
            {
              timeOut: 3000,
            }
          );
        }
      },
      (error) => { 
      }
    );
    this.loginForm.reset();
  }
  toogle() {
    this.showpassword = !this.showpassword;
  }
}
