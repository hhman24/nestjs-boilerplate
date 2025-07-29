import { BooleanFieldOptional, StringField } from "@decorators";
import { IsEmail, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class CreateUserReqDto {
    @StringField()
    readonly firstName!: string;

    @StringField()
    readonly lastName!: string;

    @StringField()
    @IsEmail()
    readonly email!: string;

    @StringField()
    @IsStrongPassword()
    readonly password!: string;

    @StringField()
    @IsPhoneNumber()
    phone?: string;
}

export class CreateUserSettingDto {
    @BooleanFieldOptional()
    isEmailVerified?: boolean;

    @BooleanFieldOptional()
    isPhoneVerified?: boolean;
}
