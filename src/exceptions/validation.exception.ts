import { AppErrorType } from "@common";
import { HttpStatus } from "@nestjs/common";
import { AppException } from "./app.exception";

export class ValidationException extends AppException {
    constructor(errorData: AppErrorType) {
        super(errorData, HttpStatus.BAD_REQUEST);
    }
}
