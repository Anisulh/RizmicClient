export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  termsOfService: {
    agreed: boolean;
    dateAgreed: string;
  };
  privacyPolicy: {
    agreed: boolean;
    dateAgreed: string;
  };
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
}

export interface IRegisterAPIParams {
  userData?: IRegisterUser;
  credential?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ILoginAPIParams {
  userData?: IUserLogin;
  credential?: string;
}

export interface IUpdateProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
