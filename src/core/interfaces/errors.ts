export interface ValidationErrorDetail {
  type: string;
  field: string;
  message: string;
}

export interface ValidationErrors {
  errors: ValidationErrorDetail[];
}
