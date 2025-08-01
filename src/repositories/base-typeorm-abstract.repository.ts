import { IFindAllResponse } from "@common";
import { AbstractEntity } from "src/common/bases";
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { IBaseRepository } from "./base-interface.repository";

export abstract class BaseRepositoryTypeOrmAbstract<T extends AbstractEntity> implements IBaseRepository<T> {
    constructor(protected readonly repository: Repository<T>) {}

    async create(dto: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(dto);

        return this.repository.save(entity);
    }

    async findOneById(id: string, projection?: string, options?: Omit<FindOneOptions<T>, "where" | "select">): Promise<T | null> {
        const select = projection ? (projection.split(" ") as (keyof T)[]) : undefined;

        return this.repository.findOne({
            where: { id } as unknown as FindOptionsWhere<T>,
            ...(options || {}),
            ...(select ? { select } : {})
        });
    }

    async findOneByCondition(condition: FindOptionsWhere<T> = {}, projection?: string): Promise<T> {
        const select = projection ? (projection.split(" ") as (keyof T)[]) : undefined;

        return this.repository.findOne({
            where: condition as FindOptionsWhere<T>,
            select
        });
    }

    async findAll(condition: FindOptionsWhere<T> = {}, options?: Omit<FindOneOptions<T>, "where">): Promise<IFindAllResponse<T>> {
        const findOptions: FindManyOptions<T> = {
            where: condition as FindOptionsWhere<T>,
            ...(options || {})
        };

        const [data, total] = await this.repository.findAndCount(findOptions);
        return { items: data, count: total };
    }

    async update(id: string, dto: DeepPartial<T>): Promise<T | null> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) {
            return null;
        }

        const updated = this.repository.merge(entity, dto);
        return this.repository.save(updated);
    }

    async softDelete(id: string): Promise<boolean> {
        const result = await this.repository.softDelete(id);
        return result.affected !== 0;
    }

    async permanentlyDelete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
