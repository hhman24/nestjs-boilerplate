import { Global, Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { v4 } from "uuid";
import ClsContextStorageService from "./context-storage.service";
import { CONTEXT_STORAGE_SERVICE_KEY } from "./interfaces";

@Global()
@Module({
    imports: [
        ClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                generateId: true,
                idGenerator: (req: Request) => req.headers["x-correlation-id"] ?? v4()
            }
        })
    ],
    providers: [
        {
            provide: CONTEXT_STORAGE_SERVICE_KEY,
            useClass: ClsContextStorageService
        }
    ],
    exports: [CONTEXT_STORAGE_SERVICE_KEY]
})
export class ContextStoraggeModule {}
