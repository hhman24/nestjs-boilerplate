import { FindAllResponseType } from "@common";

export interface IBaseRepository<T> {
    create(dto: T | any): Promise<T>;
    findOneById(id: string, projection?: string, option?: object): Promise<T>;
    findOneByCondition(condition?: object, projection?: string): Promise<T>;
    findAll(condition: object, options?: object): Promise<FindAllResponseType<T>>;
    update(id: string, dto: Partial<T>): Promise<T>;
    softDelete(id: string): Promise<boolean>;
    permanentlyDelete(id: string): Promise<boolean>;
}
