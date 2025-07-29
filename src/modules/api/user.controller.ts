import { ResponseTypeDto } from "@common";
import { ApiOkResponseCustom, UUIDParam } from "@decorators";
import { CreateUserReqDto, UserResponseDto } from "@modules/user/dtos";
import { IUSER_SERVICE_TOKEN, IUserService } from "@modules/user/interfaces";
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
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

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponseCustom(ResponseTypeDto, UserResponseDto)
    async getUser(@UUIDParam("id") userId: Uuid): Promise<ResponseTypeDto> {
        const user = await this.userService.getUser(userId);

        return {
            data: user.toDto(UserResponseDto, { isActive: true })
        };
    }
}
