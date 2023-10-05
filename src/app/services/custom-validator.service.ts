import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordMatchValidator {
  static passwordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('cpassword')?.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}

export class PasswordMatchValidator2 {
  static passwordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newpassword = control.get('newpassword')?.value;
      const confirmNewPassword = control.get('confirmNewPassword')?.value;

      return newpassword === confirmNewPassword
        ? null
        : { passwordMismatch: true };
    };
  }
}
