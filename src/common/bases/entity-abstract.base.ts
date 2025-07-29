import { Constructor } from "@extensions";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Abstract Entity
 *
 * @description This class is an abstract class for all entities.
 * It's experimental and recommended using it only in microservice architecture,
 * otherwise just delete and use your own entity.
 */
export abstract class AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: Uuid;

    @CreateDateColumn({
        type: "timestamp"
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp"
    })
    updatedAt!: Date;

    toDto<Dto, IDtoOptions>(dtoClass: Constructor<Dto, [this, IDtoOptions?]>, options?: IDtoOptions): Dto {
        return new dtoClass(this, options);
    }
}
