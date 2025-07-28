export type IAppError = {
    message: string;
    error?: Error;
    code: number;
};

export type IResponseType<T = any> = {
    code?: number;
    message?: string;
    data?: T;
};

export type IFindAllResponse<T> = { count: number; items: T[] };
