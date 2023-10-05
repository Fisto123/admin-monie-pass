import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { changepasswordModel } from 'src/app/models/resetpassword.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  PasswordMatchValidator,
  PasswordMatchValidator2,
} from 'src/app/services/custom-validator.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  forgotpasswordForm!: FormGroup;
  showLoading!: boolean;
  email!: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.auth.decodedUserEmail();
    this.email;

    this.reactiveForm();
  }
  reactiveForm() {
    this.forgotpasswordForm = this.fb.group(
      {
        email: [this.email, [(Validators.required, Validators.email)]],
        password: ['', [Validators.required]],
        newpassword: ['', [Validators.required]],
        confirmNewPassword: ['', [Validators.required]],
      },
      {
        validator: PasswordMatchValidator2.passwordMatch(),
      }
    );
  }
  get fc() {
    return this.forgotpasswordForm.controls;
  }
  onSubmit(form: changepasswordModel) {
    const form2 = {
      email: form.email,
      password: form.password,
      newpassword: form.newpassword,
    };
    this.showLoading = true;
    this.spinner.show();
    this.auth.changePassword(form2).subscribe(
      (res: any) => {
        if (res.success === true) {
          this.showLoading = false;
          this.spinner.hide();
          this.toastr.success('Success', 'password changed successfully', {
            timeOut: 3000,
          });
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
      (error) => {}
    );
  }
}
