import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSettingTable1754469586144 implements MigrationInterface {
    name = "CreateUserSettingTable1754469586144";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE user_settings (
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at DATETIME,

                user_id CHAR(36) NOT NULL,
                is_email_verified BOOLEAN,
                is_phone_verified BOOLEAN,

                CONSTRAINT PK_user_setting PRIMARY KEY (user_id)
            );
        `);

        await queryRunner.query(`
            ALTER TABLE user_settings
            ADD CONSTRAINT FK_user_settings_users FOREIGN KEY (user_id) REFERENCES users(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user_settings;`);
    }
}
