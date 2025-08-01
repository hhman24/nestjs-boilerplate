import { AbstractEntity } from "src/common/bases";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products" })
export class ProductEntity extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id: Uuid;

    @Column({ type: "decimal", precision: 10, scale: 4 })
    price: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "longtext" })
    description: string;
}
