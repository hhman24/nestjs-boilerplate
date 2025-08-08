import { OrderStatusEnum } from "@enums";
import { AbstractEntity } from "src/common/bases";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";

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

    @Column({ type: "tinyint", default: () => OrderStatusEnum.PENDING })
    status: number;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
    orderItems: OrderItemEntity[];
}
