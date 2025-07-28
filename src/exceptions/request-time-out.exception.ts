import { IAppError } from "@common";
import { HttpStatus } from "@nestjs/common";
import { AppException } from "./app.exception";

export class RequestTimeOutException extends AppException {
    constructor(errorData: IAppError) {
        super(errorData, HttpStatus.REQUEST_TIMEOUT);
    }
}
