export interface ApiError<Payload = unknown> {
  message: string;
  payload?: Payload;
}

export interface ApiFieldValidationError {
  location: string;
  msg: string;
  param: string;
  value: string;
}

export type ApiValidationError = Required<ApiError<ApiFieldValidationError[]>>;
