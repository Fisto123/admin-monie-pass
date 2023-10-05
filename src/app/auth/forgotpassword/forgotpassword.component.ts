import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  forgotpasswordForm!: FormGroup;
  showLoading!: boolean;

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
    this.forgotpasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get fc() {
    return this.forgotpasswordForm.controls;
  }
  onSubmit(form: any) {
    this.showLoading = true;
    this.spinner.show();

    this.auth.sendCode(form).subscribe(
      (res: any) => {
        if (res.success === true) {
          this.showLoading = false;
          this.spinner.hide();
          this.toastr.success('Success', 'Check your mail for the reset code', {
            timeOut: 3000,
          });
          this.router.navigate(['confirm-password']);
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
