import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1754622830884 implements MigrationInterface {
    name = "CreateOrderTable1754622830884";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE orders (
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at DATETIME,

                id CHAR(36) NOT NULL,
                user_id CHAR(36),
                total SMALLINT,
                status TINYINT,

                CONSTRAINT PK_order_id PRIMARY KEY (id)
            );`
        );

        await queryRunner.query(`
            ALTER TABLE orders
            ADD CONSTRAINT FK_order_user
            FOREIGN KEY (user_id) REFERENCES users (id);
        `);

        await queryRunner.query(
            `CREATE TABLE products (
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at DATETIME,

                id CHAR(36) NOT NULL,
                price DECIMAL(10, 4),
                name VARCHAR(50),
                description LONGTEXT,

                CONSTRAINT PK_product_id PRIMARY KEY (id)
            );`
        );

        await queryRunner.query(
            `CREATE TABLE order_items (
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                order_id CHAR(36) NOT NULL,
                product_id CHAR(36) NOT NULL,

                CONSTRAINT PK_order_item PRIMARY KEY (order_id, product_id)
            );`
        );

        await queryRunner.query(`
            ALTER TABLE order_items
            ADD CONSTRAINT FK_order_item_order
            FOREIGN KEY (order_id) REFERENCES orders(id);
        `);

        await queryRunner.query(`
            ALTER TABLE order_items
            ADD CONSTRAINT FK_order_item_product
            FOREIGN KEY (product_id) REFERENCES products(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE order_items;`);
        await queryRunner.query(`DROP TABLE products;`);
        await queryRunner.query(`DROP TABLE orders;`);
    }
}
