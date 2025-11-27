export interface FormHelpers {
  resetForm: () => void;
}

export interface ContactFormValuesTypes {
  name: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}

export interface CreateUserDataType {
  userName: string;
  phoneNum: string;
  email: string;
  password: string;
}

export interface CheckUserSendingDataType {
  email: string;
  password: string;
}

export interface ReserveTableInfoType {
  address: string;
  date: string;
  count: string;
  tableType: string;
}

export interface UpdateDataOnProfileType {
  userEmail: any;
  userOldPass: string;
  userNewPass: string;
  userNewPassRepeat: string;
}

export interface SendingWatchListTyoe {
  mealId: string;
  label: string;
} //  ??????????????
