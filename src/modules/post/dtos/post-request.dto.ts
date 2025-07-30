import { CreateTranslationDto } from "@common";
import { ClassField } from "@decorators";
import { supportedLanguageCount } from "@enums";
import { ArrayMaxSize, ArrayMinSize, IsArray } from "class-validator";

export class CreatePostReqDto {
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(supportedLanguageCount)
    @ClassField(() => CreateTranslationDto, { each: true, isArray: true })
    title!: CreateTranslationDto[];

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(supportedLanguageCount)
    @ClassField(() => CreateTranslationDto, { each: true, isArray: true })
    description!: CreateTranslationDto[];
}
