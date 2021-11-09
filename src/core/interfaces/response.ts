import { ValidationErrors } from "./errors";

export interface HttpResponse {
  code: number;
  message: string;
}

export interface Response {
  data: HttpResponse | ValidationErrors;
  code: number;
}
