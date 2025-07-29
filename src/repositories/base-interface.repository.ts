import { IFindAllResponse } from "@common";

export interface IBaseRepository<T> {
    create(dto: T | any): Promise<T>;
    findOneById(id: string, projection?: string, option?: object): Promise<T | null>;
    findOneByCondition(condition?: object, projection?: string): Promise<T | null>;
    findAll(condition: object, options?: object): Promise<IFindAllResponse<T>>;
    update(id: string, dto: Partial<T> | any): Promise<T | null>;
    softDelete(id: string): Promise<boolean>;
    permanentlyDelete(id: string): Promise<boolean>;
}
