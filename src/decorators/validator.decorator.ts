import { Param, ParseUUIDPipe, PipeTransform, Type } from "@nestjs/common";
import { ValidateIf, ValidationOptions } from "class-validator";

export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((_obj, value) => value !== undefined, options);
}

export function IsNullable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((_obj, value) => value !== null, options);
}

export function UUIDParam(property: string, ...pipes: Array<Type<PipeTransform> | PipeTransform>): ParameterDecorator {
    return Param(property, new ParseUUIDPipe({ version: "4" }), ...pipes);
}
