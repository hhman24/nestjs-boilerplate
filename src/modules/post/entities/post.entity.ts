import { UserEntity } from "@modules/user/entities";
import { AbstractEntity } from "src/common/bases";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PostTranslationEntity } from "./post-translation.entity";

@Entity({ name: "posts" })
export class PostEntity extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "uuid" })
    userId!: string;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user!: Relation<UserEntity>;

    @OneToMany(() => PostTranslationEntity, (postTranslationEntity) => postTranslationEntity.post)
    declare translations?: PostTranslationEntity[];
}
