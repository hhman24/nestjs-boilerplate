import type { Config } from "jest";

const config: Config = {
    verbose: true,
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@common/(.*)$": "<rootDir>/common/$1",
        "^@modules/(.*)$": "<rootDir>/modules/$1",
        "^@environments/(.*)$": "<rootDir>/environments/$1",
        "^@utils/(.*)$": "<rootDir>/utils/$1"
    }
};

export default config;
