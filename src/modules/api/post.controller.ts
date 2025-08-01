import { ResponseTypeDto } from "@common";
import { ApiOkResponseCustom } from "@decorators";
import { CreatePostReqDto } from "@modules/post/dtos";
import { IPostService, POST_SERVICE_TOKEN } from "@modules/post/interfaces";
import { UserResponseDto } from "@modules/user/dtos";
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("posts")
@ApiTags("Posts")
export class PostController {
    constructor(@Inject(POST_SERVICE_TOKEN) private readonly postService: IPostService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponseCustom(ResponseTypeDto, UserResponseDto)
    async createUser(@Body() dto: CreatePostReqDto): Promise<ResponseTypeDto> {
        const post = await this.postService.create("4bcecfd9-8726-4adc-9831-e987028327a9" as Uuid, dto);

        return {
            data: post
        };
    }
}
