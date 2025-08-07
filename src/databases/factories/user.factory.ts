import { UserEntity } from "@modules/user/entities";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(UserEntity, (fake) => {
    const firstName = fake.person.firstName();
    const lastName = fake.person.lastName();

    const user = new UserEntity({
        firstName,
        lastName,
        email: fake.internet.email({ firstName, lastName }),
        password: "12345678"
    });

    return user;
});
