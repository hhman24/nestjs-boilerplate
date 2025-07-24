import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiOkPaginationResponseCustom = <WrapperDto extends Type<unknown>, PaginationDto extends Type<unknown>, ItemDto extends Type<unknown>>(
    responseTypeDto: WrapperDto,
    paginationDto: PaginationDto,
    dataDto: ItemDto
) =>
    applyDecorators(
        ApiExtraModels(responseTypeDto, paginationDto, dataDto),
        ApiOkResponse({
            description: "",
            schema: {
                allOf: [
                    { $ref: getSchemaPath(responseTypeDto) },
                    {
                        properties: {
                            data: {
                                $ref: getSchemaPath(paginationDto),
                                properties: {
                                    items: {
                                        type: "array",
                                        items: {
                                            $ref: getSchemaPath(dataDto)
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })
    );

export const ApiOkResponseCustom = <WrapperDto extends Type<unknown>, ItemDto extends Type<unknown>>(responseTypeDto: WrapperDto, dataDto: ItemDto) =>
    applyDecorators(
        ApiExtraModels(responseTypeDto, dataDto),
        ApiOkResponse({
            description: "",
            schema: {
                allOf: [
                    { $ref: getSchemaPath(responseTypeDto) },
                    {
                        properties: {
                            data: { $ref: getSchemaPath(dataDto) }
                        }
                    }
                ]
            }
        })
    );
