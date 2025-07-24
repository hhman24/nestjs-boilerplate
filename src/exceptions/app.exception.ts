import { AppErrorType } from "@common";
import { MessageCodeEnum } from "@enums";
import { HttpException, HttpStatus } from "@nestjs/common";

export class AppException extends HttpException {
    constructor({ message, code = MessageCodeEnum.INTERNAL_SERVER_ERROR }: AppErrorType, status?: HttpStatus) {
        super({ message, code }, status);
    }
}

// export class ResourceNotFoundException extends AppException {
//     constructor(resourceType: string, identifier: string | number) {
//         super(`${resourceType} with identifier ${identifier} not found`, HttpStatus.NOT_FOUND, "RESOURCE_NOT_FOUND");
//     }
// }

// export class AuthenticationException extends AppException {
//     constructor(message = "Authentication failed") {
//         super(message, HttpStatus.UNAUTHORIZED, "AUTHENTICATION_FAILED");
//     }
// }
