import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    parserPreset: "conventional-changelog-atom",
    formatter: "@commitlint/format",
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // New feature
                "fix", // Bug fix
                "docs", // Documentation changes
                "style", // Changes that do not affect the meaning of the code (e.g., formatting)
                "refactor", // Code changes that neither fix a bug nor add a feature
                "perf", // Performance improvement
                "test", // Adding missing tests or correcting existing tests
                "build", // Changes that affect the build system or external dependencies
                "ci", // Changes to CI configuration files and scripts
                "chore", // Other changes that don't modify src or test files
                "revert", // Reverts a previous commit
                "release" // Release related changes
            ]
        ]
    }
};

export default Configuration;
