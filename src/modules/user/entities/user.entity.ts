import { AbstractEntity } from "src/common/bases";
import { RoleTypeEnum } from "src/enums/type.enum";
import { Column, Entity, OneToOne } from "typeorm";
import { UserSettingEntity } from "./user-setting.entity";

@Entity({ name: "users" })
export class UserEntity extends AbstractEntity {
    @Column({ nullable: true, type: "varchar" })
    firstName!: string | null;

    @Column({ nullable: true, type: "varchar" })
    lastName!: string | null;

    @Column({ unique: true, nullable: true, type: "varchar" })
    email!: string | null;

    @Column({ type: "enum", enum: RoleTypeEnum, default: RoleTypeEnum.USER })
    role!: RoleTypeEnum;

    @Column({ nullable: true, type: "varchar" })
    password!: string | null;

    @Column({ nullable: true, type: "varchar" })
    phone!: string | null;

    @Column({ nullable: true, type: "varchar" })
    avatar!: string | null;

    // define relationship with user_setting table
    @OneToOne(() => UserSettingEntity, (userSetting) => userSetting.user)
    settings?: UserSettingEntity;

    constructor(entity: Partial<UserEntity>) {
        super();
        Object.assign(this, entity);
    }
}
