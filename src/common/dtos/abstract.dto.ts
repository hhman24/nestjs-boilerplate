import { DateField, UUIDField } from "@decorators";
import { AbstractEntity } from "../bases/entity-abstract.base";
import { IDtoOptions } from "../interfaces";

export class AbstractDto {
    @UUIDField()
    id!: Uuid;

    @DateField()
    createdAt!: Date;

    @DateField()
    updatedAt!: Date;

    translations?: AbstractTranslationDto[];

    constructor(entity: AbstractEntity, options?: IDtoOptions) {
        if (!options?.excludeFields) {
            this.id = entity.id;
            this.createdAt = entity.createdAt;
            this.updatedAt = entity.updatedAt;
        }
    }
}

export class AbstractTranslationDto extends AbstractDto {
    constructor(entity: AbstractEntity) {
        super(entity, { excludeFields: true });
    }
}
