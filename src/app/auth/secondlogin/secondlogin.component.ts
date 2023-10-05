import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { confirmEmail } from 'src/app/models/confirmMail.model';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordMatchValidator } from 'src/app/services/custom-validator.service';

@Component({
  selector: 'app-secondlogin',
  templateUrl: './secondlogin.component.html',
  styleUrls: ['./secondlogin.component.css'],
})
export class SecondloginComponent {
  confirmEmailForm!: FormGroup;
  showLoading!: boolean;
  showpassword: boolean = true;
  showConfIrmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reactiveForm();
  }
  reactiveForm() {
    this.confirmEmailForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        code: ['', [Validators.required]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
      },
      {
        validator: PasswordMatchValidator.passwordMatch(),
      }
    );
  }
  get fc() {
    return this.confirmEmailForm.controls;
  }
  onSubmit(form: confirmEmail) {
    const form2 = {
      email: form.email,
      code: form.code,
      password: form.password,
    };
    this.showLoading = true;
    this.spinner.show();

    this.auth.confirmEmail(form2).subscribe(
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
        } else if (res.token === null && res.success === true) {
          this.showLoading = false;
          this.toastr.success(
            'Success',
            'password reset successful please login if you are an admin',
            {
              timeOut: 3000,
            }
          );
          this.router.navigate(['login']);
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
      (error) => {}
    );
    this.confirmEmailForm.reset();
  }
  tooglePassword() {
    this.showpassword = !this.showpassword;
  }
  toogleConfirmPassword() {
    this.showConfIrmPassword = !this.showConfIrmPassword;
  }
}
