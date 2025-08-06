import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1754466958609 implements MigrationInterface {
    name = "CreatePostTable1754466958609";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE posts (
                id         CHAR(36)          NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at DATETIME,
                user_id    CHAR(36),

                CONSTRAINT PK_post_id PRIMARY KEY (\`id\`)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE post_translations (
                id         CHAR(36)          NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                post_id    CHAR(36)          NOT NULL,
                title      VARCHAR(255),
                description VARCHAR(500),

                CONSTRAINT PK_post_translations_id PRIMARY KEY (id)
            );
        `);

        await queryRunner.query(`
            ALTER TABLE post_translations
            ADD CONSTRAINT FK_post_translations_posts_id FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE posts
            ADD CONSTRAINT FK_posts_users FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE post_translations;`);
        await queryRunner.query(`DROP TABLE posts;`);
    }
}
