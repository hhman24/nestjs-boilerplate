import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => {
                return {
                    type: "mysql", // Specifying the database type as mysql and it also supports mariadb
                    host: "localhost", // Database host, in this case, it's localhost
                    port: 3306, // Port number where the database is running, 3306 is the default for MySQL
                    username: "root", // Username for connecting to the database
                    password: "root", // Password for the database user
                    database: "nestjs", // Name of the database to connect to
                    synchronize: true, // Indicates if database schema should be auto created on every start
                    autoLoadEntities: true,
                    //Logger setings to log error's and warn's in the ORM.
                    logger: "file",
                    logging: ["error"]
                };
            }
        })
    ]
})
export class DatabaseModule {}
