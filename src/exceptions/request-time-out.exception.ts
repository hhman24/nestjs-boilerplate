import { AppErrorType } from "@common";
import { HttpStatus } from "@nestjs/common";
import { AppException } from "./app.exception";

export class RequestTimeOutException extends AppException {
    constructor(errorData: AppErrorType) {
        super(errorData, HttpStatus.REQUEST_TIMEOUT);
    }
}
