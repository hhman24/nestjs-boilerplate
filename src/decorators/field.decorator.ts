import { IEnumFieldOptions, IFieldOptions } from "@common";
import { applyDecorators } from "@nestjs/common";
import { ApiProperty, type ApiPropertyOptions } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsUUID, NotEquals } from "class-validator";
import { ApiEnumProperty, ApiUUIDProperty } from "./swagger-property.decorator";
import { ToArray } from "./transfrom.decorator";
import { IsNullable, IsUndefinable } from "./validator.decorator";

export function EnumField<TEnum extends object>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, "type" | "enum" | "enumName" | "isArray"> & IEnumFieldOptions = {}
): PropertyDecorator {
    const enumValue = getEnum();
    const decorators = [IsEnum(enumValue, { each: options.each })];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    if (options.swagger !== false) {
        decorators.push(ApiEnumProperty(getEnum, { ...options, isArray: options.each }));
    }

    return applyDecorators(...decorators);
}

export function EnumFieldOptional<TEnum extends object>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, "type" | "required" | "enum" | "enumName"> & IEnumFieldOptions = {}
): PropertyDecorator {
    return applyDecorators(IsUndefinable(), EnumField(getEnum, { required: false, ...options }));
}

export function UUIDField(options: Omit<ApiPropertyOptions, "type" | "format" | "isArray"> & IFieldOptions = {}): PropertyDecorator {
    const decorators = [Type(() => String), IsUUID("4", { each: options.each })];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiUUIDProperty(options));
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    return applyDecorators(...decorators);
}

export function UUIDFieldOptional(options: Omit<ApiPropertyOptions, "type" | "required" | "isArray"> & IFieldOptions = {}): PropertyDecorator {
    return applyDecorators(IsUndefinable(), UUIDField({ required: false, ...options }));
}

export function DateField(options: Omit<ApiPropertyOptions, "type"> & IFieldOptions = {}): PropertyDecorator {
    const decorators = [Type(() => Date), IsDate()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: Date, ...(options as ApiPropertyOptions) }));
    }

    return applyDecorators(...decorators);
}
