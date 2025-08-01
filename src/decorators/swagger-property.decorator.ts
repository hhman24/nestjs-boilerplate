import type { ApiPropertyOptions } from "@nestjs/swagger"; // use this type
import { ApiProperty } from "@nestjs/swagger"; // use decorator

import { getVariableName } from "@utils";

export function ApiBooleanProperty(options: Omit<ApiPropertyOptions, "type"> = {}): PropertyDecorator {
    return ApiProperty({ type: Boolean, ...(options as ApiPropertyOptions) });
}

export function ApiBooleanPropertyOptional(options: Omit<ApiPropertyOptions, "type" | "required"> = {}): PropertyDecorator {
    return ApiBooleanProperty({ required: false, ...options });
}

export function ApiUUIDProperty(options: Omit<ApiPropertyOptions, "type" | "format"> & Partial<{ each: boolean }> = {}): PropertyDecorator {
    return ApiProperty({
        type: options.each ? [String] : String,
        format: "uuid",
        isArray: options.each,
        ...(options as ApiPropertyOptions)
    });
}

export function ApiUUIDPropertyOptional(options: Omit<ApiPropertyOptions, "type" | "format" | "required"> & Partial<{ each: boolean }> = {}): PropertyDecorator {
    return ApiUUIDProperty({ required: false, ...options });
}

export function ApiEnumProperty<TEnum>(getEnum: () => TEnum, options: Omit<ApiPropertyOptions, "type"> & { each?: boolean } = {}): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enumValue = getEnum() as any;

    return ApiProperty({
        // throw error during the compilation of swagger
        // isArray: options.each,
        enum: enumValue,
        enumName: getVariableName(getEnum),
        ...(options as ApiPropertyOptions)
    });
}

export function ApiEnumPropertyOptional<TEnum>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, "type" | "required"> & {
        each?: boolean;
    } = {}
): PropertyDecorator {
    return ApiEnumProperty(getEnum, { required: false, ...options });
}
