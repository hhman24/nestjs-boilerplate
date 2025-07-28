import { Transform } from "class-transformer";
import _ from "lodash";

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
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
