import { HttpException, HttpStatus } from "@nestjs/common";

export class AppException extends HttpException {
    constructor(message: string, responseCode: number, error: unknown, status: HttpStatus) {
        super({ message, responseCode, error }, status);
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
