export type ResponseType<T = any> = {
    code?: number;
    message?: string;
    data?: T;
};

export type FindAllResponseType<T> = { count: number; items: T[] };
