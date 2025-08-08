import { ProductEntity } from "@modules/product/entities";
import { AbstractEntity } from "src/common/bases";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity({ name: "order_items" })
export class OrderItemEntity extends AbstractEntity {
    @PrimaryColumn({ type: "char" })
    order_id: string;

    @PrimaryColumn({ type: "char" })
    product_id: string;

    @ManyToOne(() => OrderEntity, (order) => order.orderItems)
    @JoinColumn({ name: "order_id" })
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, (product) => product.orderItems)
    @JoinColumn({ name: "product_id" })
    productInfo: ProductEntity;
}
