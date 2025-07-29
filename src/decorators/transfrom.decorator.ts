import { Transform, TransformFnParams } from "class-transformer";
import _ from "lodash";

/**
 * @description transforms to array, specially for query params
 * @example
 * @constructor
 */
export function ToArray(): PropertyDecorator {
    return Transform(
        (params): unknown[] => {
            const value = params.value;

            if (!value) {
                return value;
            }

            return _.castArray(value);
        },
        { toClassOnly: true } // applied when using plainToInstance(...)
    );
}

export function Trim(trimNewLines: boolean): PropertyDecorator {
    return Transform((params: TransformFnParams): string[] | string => {
        const value = params.value as string[] | string;

        if (!value) return value;

        if (Array.isArray(value)) {
            return value.map((v) => {
                const trimmedValue = v.trim();

                if (trimNewLines) {
                    return trimmedValue.replaceAll(/\s\s+/g, " ");
                }

                return trimmedValue;
            });
        }

        const trimmedValue = value.trim();

        if (trimNewLines) {
            return trimmedValue.replaceAll(/\s\s+/g, " ");
        }

        return trimmedValue;
    });
}

export function ToBoolean(): PropertyDecorator {
    return Transform(
        (params: TransformFnParams): boolean => {
            switch (params.value) {
                case "true":
                    return true;
                case "false":
                    return false;

                default: {
                    return params.value;
                }
            }
        },
        { toClassOnly: true }
    );
}

/**
 * @description convert string or number to integer
 * @returns PropertyDecorator
 */
export function ToInt(): PropertyDecorator {
    return Transform(
        (params: TransformFnParams): number => {
            const value = params.value as string;

            return Number.parseInt(value, 10);
        },
        { toClassOnly: true }
    );
}

export function ToLowerCase(): PropertyDecorator {
    return Transform(
        (params: TransformFnParams): string | string[] => {
            const value = params.value;

            if (!value) {
                return;
            }

            if (!Array.isArray(value)) {
                return value.toLowerCase();
            }

            return value.map((v) => v.toLowerCase());
        },
        {
            toClassOnly: true
        }
    );
}

export function ToUpperCase(): PropertyDecorator {
    return Transform(
        (params): string | string[] => {
            const value = params.value;

            if (!value) {
                return;
            }

            if (!Array.isArray(value)) {
                return value.toUpperCase();
            }

            return value.map((v) => v.toUpperCase());
        },
        {
            toClassOnly: true
        }
    );
}

export function LinkCleanupTransform(options?: { removeTrailingSlash?: boolean; removeQueryParams?: boolean }): PropertyDecorator {
    return Transform((params) => {
        let value = params.value as string;

        if (!value) {
            return value;
        }

        if (options?.removeQueryParams) {
            value = value.replace(/\?.*$/, "");
        }

        if (options?.removeTrailingSlash ?? true) {
            value = value.replace(/\/+$/, "");
        }

        return value;
    });
}
