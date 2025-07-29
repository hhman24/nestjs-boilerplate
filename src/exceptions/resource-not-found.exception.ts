import { IResourceType } from "@common";
import { MessageCodeEnum } from "@enums";
import { HttpStatus } from "@nestjs/common";
import { AppException } from "./app.exception";

export class ResourceNotFoundException extends AppException<{ resourceType: string; identifier: string }> {
    constructor(resourceType: IResourceType, identifier: string) {
        super(
            {
                message: `error.notfound.${resourceType}`,
                code: MessageCodeEnum.BAD_REQUEST,
                meta: { resourceType, identifier }
            },
            HttpStatus.NOT_FOUND
        );
    }
}
