export interface usermodel {
  id: number | null;
  createdBy: Date;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  code: string;
  password: string;
  salt: string;
  role: string;
  isEmailConfirmed: true;
  isDeactivated: true;
  lastLogin: Date;
}
