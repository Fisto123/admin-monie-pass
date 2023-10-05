import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { superAdminModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  showLoading!: boolean;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {}
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
    });
  }
  get fc() {
    return this.registerForm.controls;
  }
  onSubmit(form: superAdminModel) {
    this.showLoading = true;
    this.spinner.show();
    this.auth.register(form).subscribe(
      (res: any) => {
        this.showLoading = false;
        if (res?.success === true) {
          this.toastr.success('Success', 'User registered successfuly!!', {
            timeOut: 3000,
          });
          this.dialogRef.close();
        } else {
          this.showLoading = false;
          this.toastr.error('Error', res.errorReason, {
            timeOut: 3000,
          });
          this.registerForm.reset();
        }
      },
      (error) => {
        // Handle login error here
      }
    );
  }
}
