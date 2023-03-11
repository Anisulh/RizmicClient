export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  profilePicture: string;
  phoneNumber: string
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterAPIParams {
  userData?: IRegisterUser;
  credential?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ILoginAPIParams{
  userData?: IUserLogin;
  credential?: string;
}