import { LanguageCodeEnum } from "@enums";
import { AbstractEntity } from "src/common/bases";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PostEntity } from "./post.entity";

@Entity({ name: "post_translations" })
export class PostTranslationEntity extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "uuid" })
    postId!: string;

    @Column({ type: "enum", enum: LanguageCodeEnum })
    languageCode!: LanguageCodeEnum;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => PostEntity, (postEntity) => postEntity.translations, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "post_id" })
    post?: Relation<PostEntity>;
}
