import { AbstractEntity } from "src/common/bases";
import { Column, Entity } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends AbstractEntity {
    @Column({ nullable: true, type: "varchar" })
    firstName!: string | null;

    @Column({ nullable: true, type: "varchar" })
    lastName!: string | null;

    @Column({ unique: true, nullable: true, type: "varchar" })
    email!: string | null;

    @Column({ nullable: true, type: "varchar" })
    password!: string | null;

    @Column({ nullable: true, type: "varchar" })
    phone!: string | null;

    @Column({ nullable: true, type: "varchar" })
    avatar!: string | null;
}
