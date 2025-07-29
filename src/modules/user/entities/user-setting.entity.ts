import { AbstractEntity } from "src/common/bases";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "user_setting" })
export class UserSettingEntity extends AbstractEntity {
    @Column({ default: false })
    isEmailVerified?: boolean;

    @Column({ default: false })
    isPhoneVerified?: boolean;

    @PrimaryColumn({ type: "uuid" })
    userId?: string;

    @OneToOne(() => UserEntity, (user) => user.settings, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user?: Relation<UserEntity>; // relation
}
