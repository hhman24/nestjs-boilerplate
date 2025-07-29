export type IResponseType<T = any> = {
    code?: number;
    message?: string;
    data?: T;
};

export type IFindAllResponse<T> = { count: number; items: T[] };

export type IDtoOptions = { excludeFields?: boolean };
export interface IDto<T> {
    new (entity: T, options?: any): any;
}

export type IResourceType = "user" | "post";
