import { UserEntity } from "@modules/user/entities";
import { RoleTypeEnum } from "src/enums/type.enum";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class UserSeeder1754534538840 implements Seeder {
    track = false;

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = await dataSource.getRepository(UserEntity);

        const adminUser = repository.findOne({ where: { role: RoleTypeEnum.ADMIN } });

        if (!adminUser) {
            await repository.insert(
                new UserEntity({
                    email: "admin@example.com",
                    password: "123"
                })
            );
        }

        const userFactory = factoryManager.get(UserEntity);
        await userFactory.saveMany(5);
    }
}
