import { IAppError } from "@common";
import { HttpException, HttpStatus } from "@nestjs/common";

export class AppException<TMeta extends Record<string, any> = any> extends HttpException {
    constructor({ message, code, error, meta }: IAppError<TMeta>, status?: HttpStatus) {
        super({ message, code, meta }, status);

        // Optional: attach error for deeper logging (e.g., stack trace)
        if (error) {
            this.stack = error.stack;
        }
    }
}

// export class AuthenticationException extends AppException {
//     constructor(message = "Authentication failed") {
//         super(message, HttpStatus.UNAUTHORIZED, "AUTHENTICATION_FAILED");
//     }
// }
