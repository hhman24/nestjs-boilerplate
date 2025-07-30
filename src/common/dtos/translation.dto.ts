import { EnumField, StringField } from "@decorators";
import { LanguageCodeEnum } from "@enums";

export class CreateTranslationDto {
    @EnumField(() => LanguageCodeEnum)
    languageCode!: LanguageCodeEnum;

    @StringField()
    text!: string;
}
