import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";
import { IPageMetaType } from "../interfaces";

export class PageOptionsRequestDto {
    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page: number = 1;

    @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly limit: number = 10;
}

export class PageMetaDto {
    constructor({ totalItem, page, limit }: IPageMetaType) {
        this.page = +page;
        this.limit = +limit;
        this.totalPage = Math.ceil(totalItem / limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = totalItem > this.limit && this.page <= this.totalPage;
    }

    @ApiResponseProperty()
    page: number;

    @ApiResponseProperty()
    limit: number;

    @ApiResponseProperty()
    totalPage: number;

    @ApiResponseProperty()
    hasPreviousPage: boolean;

    @ApiResponseProperty()
    hasNextPage: boolean;
}

export class PageResponseDto<T> {
    @ApiResponseProperty({ type: () => [Object] })
    readonly items: T[];

    @ApiResponseProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;

    constructor(items: T[], meta: PageMetaDto) {
        this.items = items;
        this.meta = meta;
    }
}
