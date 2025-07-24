export type ResponseType<T = any> = {
    code?: number;
    message?: string;
    data?: T;
};
