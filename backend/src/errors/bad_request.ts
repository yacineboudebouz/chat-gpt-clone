import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom_api.js";

export class BadRequest extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statuscode = StatusCodes.UNAUTHORIZED;
  }
  public statuscode: number;
}
