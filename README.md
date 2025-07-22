<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework boilerplate TypeScript starter repository.

## Project setup

```bash
npm install
```

## Project debug

Create a `.vscode/launch.json` filed contained debug config

```json
{
    "name": "Attach",
    "port": 9233,
    "request": "attach",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "type": "node",
    "remoteRoot": "/app"
}
```

Modify port in package.json script command `start:debug`

## Format project with Eslinet, Prettier

Install and restart IDE vscode with extension `EditorConfig` create new `.editorconfig` file

```md
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true
```

Install prettier and eslint package to support orgainze source code: `prettier-plugin-organize-imports`, `eslint-plugin-unused-imports`

## Setting up CommitLint, Husky and Lint-staged

Install CommitLint and config-conventional

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/types conventional-changelog-atom
```

Create `commitlint.config.ts` file in the root level

```bash
# Add commit message linting to commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
# Windows users should use ` to escape dollar signs
echo "npx --no -- commitlint --edit `$1" > .husky/commit-msg
```

Install husky and init to Automatically lint your commit messages, code, and run tests upon committing or pushing.

```bash
npm install --save-dev husky
```

```bash
npx husky init
```

Setting lint-staged

```bash
npm install --save-dev lint-staged # requires further setup
```



## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
npm install -g mau
mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
