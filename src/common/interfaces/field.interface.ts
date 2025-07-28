export interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
}

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type IEnumFieldOptions = IFieldOptions;
