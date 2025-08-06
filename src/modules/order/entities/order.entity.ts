import { AbstractEntity } from "src/common/bases";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "orders" })
export class OrderEntity extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    orderedOn: Date;

    @Column({ type: "uuid" })
    userId: string;

    @Column({ type: "int" })
    total: number;

    @Column({ type: "varchar", length: 50 })
    status: string;
}
