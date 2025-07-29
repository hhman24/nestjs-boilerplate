import { Constructor } from "@extensions";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Abstract Entity
 *
 * @description This class is an abstract class for all entities.
 * It's experimental and recommended using it only in microservice architecture,
 * otherwise just delete and use your own entity.
 */
export abstract class AbstractEntity {
    @CreateDateColumn({
        type: "timestamp"
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp"
    })
    updatedAt!: Date;

    @DeleteDateColumn({
        type: "timestamp"
    })
    deletedAt!: Date;

    toDto<Dto, IDtoOptions>(dtoClass: Constructor<Dto, [this, IDtoOptions?]>, options?: IDtoOptions): Dto {
        if (!this) {
            throw new Error(`Cannot call toDto() on null or undefined instance of ${dtoClass.name}`);
        }

        return new dtoClass(this, options);
    }
}
