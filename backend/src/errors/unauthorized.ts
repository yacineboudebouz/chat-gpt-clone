import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom_api.js";

export class Unauthorized extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statuscode = StatusCodes.UNAUTHORIZED;
  }
  public statuscode: number;
}
