import { AbstractDto, IDtoOptions } from "@common";
import { ApiResponseProperty } from "@nestjs/swagger";
import { RoleTypeEnum } from "src/enums/type.enum";
import { UserEntity } from "../entities";

export class UserResponseDto extends AbstractDto {
    @ApiResponseProperty()
    firstName?: string | null;

    @ApiResponseProperty()
    lastName?: string | null;

    @ApiResponseProperty()
    username!: string;

    @ApiResponseProperty({ enum: RoleTypeEnum })
    role?: RoleTypeEnum;

    @ApiResponseProperty()
    email?: string | null;

    @ApiResponseProperty()
    avatar?: string | null;

    @ApiResponseProperty()
    phone?: string | null;

    @ApiResponseProperty()
    isActive?: boolean;

    constructor(entity: UserEntity, options?: IDtoOptions & { isActive?: boolean }) {
        super(entity, options);
        this.id = entity.id;
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.username = entity.firstName + " " + entity.lastName;
        this.role = entity.role;
        this.email = entity.email;
        this.avatar = entity.avatar;
        this.phone = entity.phone;
        this.isActive = options.isActive ?? false;
    }
}
