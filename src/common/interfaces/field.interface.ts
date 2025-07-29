export interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
}

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type IEnumFieldOptions = IFieldOptions;
export type IClassFieldOptions = IFieldOptions;
export type IBooleanFieldOptions = IFieldOptions;

export type INumberFieldOptions = IFieldOptions & {
    min?: number;
    max?: number;
    int?: boolean;
    isPositive?: boolean;
};

export type IStringFieldOptions = IFieldOptions & {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
    trimNewLines?: boolean;
};
