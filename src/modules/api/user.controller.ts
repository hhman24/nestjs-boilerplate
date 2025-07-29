import { ResponseTypeDto } from "@common";
import { ApiOkResponseCustom } from "@decorators";
import { CreateUserReqDto, UserResponseDto } from "@modules/user/dtos";
import { IUSER_SERVICE_TOKEN, IUserService } from "@modules/user/interfaces";
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("Users")
export class UserController {
    constructor(@Inject(IUSER_SERVICE_TOKEN) private readonly userService: IUserService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponseCustom(ResponseTypeDto, UserResponseDto)
    async createUser(@Body() dto: CreateUserReqDto): Promise<ResponseTypeDto> {
        const user = await this.userService.createUser(dto);

        return {
            data: user.toDto(UserResponseDto, { isActive: true })
        };
    }
}
