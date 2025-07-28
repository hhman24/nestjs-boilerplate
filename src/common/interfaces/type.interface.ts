export type IAppErrorType = {
    message: string;
    error?: Error;
    code: number;
};

export type ResponseType<T = any> = {
    code?: number;
    message?: string;
    data?: T;
};

export type FindAllResponseType<T> = { count: number; items: T[] };
