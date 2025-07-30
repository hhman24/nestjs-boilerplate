import { IBooleanFieldOptions, IClassFieldOptions, IEnumFieldOptions, IFieldOptions, INumberFieldOptions, IStringFieldOptions } from "@common";
import { applyDecorators } from "@nestjs/common";
import { ApiProperty, type ApiPropertyOptions } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsEnum,
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
    Matches,
    Max,
    MaxLength,
    Min,
    MinLength,
    NotEquals,
    ValidateNested
} from "class-validator";
import { Constructor } from "src/extensions";
import { ApiEnumProperty, ApiUUIDProperty } from "./swagger-property.decorator";
import { LinkCleanupTransform, ToArray, ToBoolean, ToLowerCase, ToUpperCase, Trim } from "./transfrom.decorator";
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

export function DateFieldOptional(options: Omit<ApiPropertyOptions, "type" | "required"> & IFieldOptions = {}): PropertyDecorator {
    return applyDecorators(IsUndefinable(), DateField({ ...options, required: false }));
}

export function StringField(options: Omit<ApiPropertyOptions, "type"> & IStringFieldOptions = {}): PropertyDecorator {
    const decorators = [Type(() => String), IsString({ each: options.each }), Trim(options.trimNewLines)];

    const minLength = options.minLength ?? 1;

    decorators.push(MinLength(minLength, { each: options.each }));

    if (options.maxLength) {
        decorators.push(MaxLength(options.maxLength, { each: options.each }));
    }

    if (options.toLowerCase) {
        decorators.push(ToLowerCase());
    }

    if (options.toUpperCase) {
        decorators.push(ToUpperCase());
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    if (options.nullable) {
        decorators.push(IsNullable({ each: options.each }));
    } else {
        decorators.push(NotEquals(null, { each: options.each }));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({
                type: String,
                ...(options as ApiPropertyOptions),
                isArray: options.each
            })
        );
    }

    return applyDecorators(...decorators);
}

export function StringFieldOptional(options: Omit<ApiPropertyOptions, "type" | "required"> & IStringFieldOptions = {}): PropertyDecorator {
    return applyDecorators(IsUndefinable(), StringField({ required: false, ...options }));
}

export function NumberField(options: Omit<ApiPropertyOptions, "type"> & INumberFieldOptions = {}): PropertyDecorator {
    const decorators = [Type(() => Number)];

    if (options.nullable) {
        decorators.push(IsNullable({ each: options.each }));
    } else {
        decorators.push(NotEquals(null, { each: options.each }));
    }

    if (options.int) {
        decorators.push(IsInt({ each: options.each }));
    } else {
        decorators.push(IsNumber({}, { each: options.each }));
    }

    if (typeof options.min === "number") {
        decorators.push(Min(options.min, { each: options.each }));
    }

    if (typeof options.max === "number") {
        decorators.push(Max(options.max, { each: options.each }));
    }

    if (options.isPositive) {
        decorators.push(IsPositive({ each: options.each }));
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: Number, ...(options as ApiPropertyOptions) }));
    }

    return applyDecorators(...decorators);
}

export function NumberFieldOptional(options: Omit<ApiPropertyOptions, "type" | "required"> & INumberFieldOptions = {}): PropertyDecorator {
    return applyDecorators(IsUndefinable(), NumberField({ required: false, ...options }));
}

export function BooleanField(options: Omit<ApiPropertyOptions, "type"> & IBooleanFieldOptions = {}): PropertyDecorator {
    const decorators = [ToBoolean(), IsBoolean()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiProperty({ type: Boolean, ...(options as ApiPropertyOptions) }));
    }

    return applyDecorators(...decorators);
}

export function BooleanFieldOptional(options: Omit<ApiPropertyOptions, "type" | "required"> & IBooleanFieldOptions = {}): PropertyDecorator {
    return applyDecorators(IsUndefinable(), BooleanField({ required: false, ...options }));
}

export function ClassField<TClass extends Constructor>(getClass: () => TClass, options: Omit<ApiPropertyOptions, "type"> & IClassFieldOptions = {}): PropertyDecorator {
    const entity = getClass();

    const decorators = [Type(() => entity), ValidateNested({ each: options.each })];

    if (options.required !== false) {
        decorators.push(IsDefined());
    }

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({
                type: () => entity,
                ...(options as ApiPropertyOptions)
            })
        );
    }

    // if (options.each) {
    //   decorators.push(ToArray());
    // }

    return applyDecorators(...decorators);
}

export function ClassFieldOptional<TClass extends Constructor>(
    getClass: () => TClass,
    options: Omit<ApiPropertyOptions, "type" | "required"> & IClassFieldOptions = {}
): PropertyDecorator {
    return applyDecorators(IsUndefinable(), ClassField(getClass, { required: false, ...options }));
}

export function LinkedinField(options: Omit<ApiPropertyOptions, "type"> & IFieldOptions = {}) {
    const decorators = [
        Expose({ groups: options.groups, name: options.name }),
        Type(() => String),
        ApiProperty({ type: String }),
        LinkCleanupTransform({
            removeQueryParams: true,
            removeTrailingSlash: true
        }),
        Matches(/^(https:\/\/)?(www\.)?linkedin\.com([\w!#%&()+./:=?@~-]*)$/)
    ];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    return applyDecorators(...decorators);
}
