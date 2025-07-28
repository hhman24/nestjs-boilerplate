import { FindAllResponseType } from "@common";
import { FilterQuery, Model, QueryOptions } from "mongoose";
import { BaseSchema } from "src/common/bases";
import { IBaseRepository } from "./base-interface.repository";

export abstract class BaseRepositoryMongoAbstract<T extends BaseSchema> implements IBaseRepository<T> {
    protected constructor(private readonly model: Model<T>) {
        this.model = model;
    }

    async create(dto: T | any): Promise<T> {
        const created_data = await this.model.create(dto);

        return created_data.save();
    }

    async findOneById(id: string, projection?: string, options?: QueryOptions<T>): Promise<T> {
        const item = await this.model.findById(id, projection, options);

        return item?.deletedAt ? null : item;
    }

    async findOneByCondition(condition = {}): Promise<T> {
        return await this.model.findOne({ ...condition, deletedAt: null }).exec();
    }

    async findAll(condition: FilterQuery<T>, options?: QueryOptions<T>): Promise<FindAllResponseType<T>> {
        const [count, items] = await Promise.all([
            this.model.countDocuments({ ...condition, deletedAt: null }),
            this.model.find({ ...condition, deletedAt: null }, options?.projection, options)
        ]);

        return {
            count,
            items
        };
    }

    async update(id: string, dto: Partial<T>): Promise<T> {
        return await this.model.findOneAndUpdate({ _id: id, deletedAt: null }, dto, { new: true });
    }

    async softDelete(id: string): Promise<boolean> {
        const delete_item = await this.model.findById(id);
        if (!delete_item) {
            return false;
        }

        return !!(await this.model.findByIdAndUpdate<T>(id, { deletedAt: new Date() }).exec());
    }

    async permanentlyDelete(id: string): Promise<boolean> {
        const delete_item = await this.model.findById(id);
        if (!delete_item) {
            return false;
        }

        return !!(await this.model.findByIdAndDelete(id));
    }
}
