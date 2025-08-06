import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1754465063798 implements MigrationInterface {
    name = "CreateUserTable1754465063798";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id         CHAR(36)          NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at DATETIME,
                first_name VARCHAR(255),
                last_name  VARCHAR(255),
                role       ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
                email      VARCHAR(255) NOT NULL,
                password   VARCHAR(255),
                phone      VARCHAR(255),
                avatar     VARCHAR(255),
                
                CONSTRAINT PK_user_id PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`CREATE UNIQUE INDEX UQ_user_email ON users (email);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users;`);
    }
}
