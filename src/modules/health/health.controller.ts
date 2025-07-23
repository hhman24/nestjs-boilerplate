import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { Controller, Get, Inject } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("health")
@ApiTags("Health Check")
export class HealthController {
    constructor(
        @Inject(LOGGER_KEY)
        private readonly logger: ILoggerService
    ) {}

    @Get()
    async check() {
        // profile
        this.logger.startProfile("getHello");

        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 1000)));

        // Debug
        this.logger.debug(
            "I am a debug message!",
            {
                props: {
                    foo: "bar",
                    baz: "qux"
                }
            },
            "getHello"
        );

        // Info
        this.logger.info("I am an info message!", {
            props: {
                foo: "bar",
                baz: "qux"
            }
        });

        // Warn
        this.logger.warn("I am a warn message!", {
            props: {
                foo: "bar",
                baz: "qux"
            },
            error: new Error("Hello World!")
        });

        // Error
        this.logger.error("I am an error message!", {
            props: {
                foo: "bar",
                baz: "qux"
            },
            error: new Error("Hello World!")
        });

        // Fatal
        this.logger.fatal("I am a fatal message!", {
            props: {
                foo: "bar",
                baz: "qux"
            },
            error: new Error("Hello World!")
        });

        // Emergency
        this.logger.emergency("I am an emergency message!", {
            props: {
                foo: "bar",
                baz: "qux"
            },
            error: new Error("Hello World!")
        });

        return "hello";
    }
}
