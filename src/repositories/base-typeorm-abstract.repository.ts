import { IBaseRepository } from "./base-interface.repository";

export abstract class BaseRepositoryTypeOrmAbstract<T extends AbstractEn> implements IBaseRepository<T> {
    protected constructor(private readonly model: Model<T>) {
        this.model = model;
    }
}
