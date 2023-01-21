export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface IStatusState {
  isError: boolean;
  message: string;
  showStatus: boolean;
}
