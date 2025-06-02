# Podman Desktop Playwright Tests

This document contains information on how to use the E2E testing framework of Podman Desktop on different scenarios.
This is particularly useful if you want to execute the tests from a Podman Desktop extension or you want to develop your own.

Prerequisites:

- Have Node.js 22 installed (ideally using `nvm`)
- Uses pnpm v10, can be installed via `npm install -g pnpm@10` or you can get it [here](https://pnpm.io/installation)
- Have a clone of the Podman Desktop repo (you can get it [here](https://github.com/containers/podman-desktop/tree/main))

## Core functionality how the E2E tests works

Podman Desktop E2E tests use the Playwright testing framework libraries to develop the tests and POM (page object model) for the Podman Desktop application. The test runner also relies on playwright code.

At this moment the electron support is marked as [experimental](https://playwright.dev/docs/api/class-electron).

In order to be able to reuse and share the core e2e tests libraries and definitions we created `@podman-desktop/tests-playwright` [npm package](https://www.npmjs.com/package/@podman-desktop/tests-playwright).

The project uses `devDependency` to `@playwright/test` for access to playwright function, assertions, etc., and also to an `electron` package, which brings the ability to run Podman Desktop application (which is electron based) when running e2e tests.

### Running E2E tests in development or production mode

We distinguish between two operational modes to run the tests with: development and production. In both cases, we need to have access to Electron binary which is used to [launch the Podman Desktop application](https://playwright.dev/docs/api/class-electron#electron-launch). Above functionality is handled by `@podman-desktop/tests-playwright` `Runner` class (`podman-desktop-runner.ts`). The runner is then shipped as a Playwright fixture and takes care of all the setup for E2E tests.

Multiple scenarios may occur:

1. Running E2E tests from `podman-desktop` repository in DEVELOPMENT mode: We do not need to set any paths to electron binary, `Runner` uses default configuration and grabs electron from `/node_modules/.bin/electron` which is installed via electron dependency postinstall script during `pnpm install`.
2. Running E2 tests from `podman-desktop` repository in PRODUCTION mode: We need to set `PODMAN_DESKTOP_BINARY` environment variable when running the tests from `podman-desktop` repository with the previously built or downloaded Podman Desktop electron app. Simply point to a `podman-desktop` binary or executable.
3. Running E2E tests in external repository in DEVELOPMENT mode: Set `PODMAN_DESKTOP_ARGS` and point to the previously built `podman-desktop` repository. We are using electron binary from `podman-desktop` repository the same way as in point 1.
4. Running E2E tests in external repository in PRODUCTION mode: Set `PODMAN_DESKTOP_BINARY` environment variable and point to a downloaded/built Podman Desktop application which is also main electron binary that is used.

This approach is beneficial in the way that we do not need to have the `electron` package set as a dependency in external repositories.

If you set `PODMAN_DESKTOP_BINARY` and `PODMAN_DESKTOP_ARGS` at the same time, the runner will throw an error since you cannot really run tests in both mode at the same time.

You can get testing-enabled Podman Desktop binaries and installation files from [testing-prereleases repository](https://github.com/podman-desktop/testing-prereleases).

## Usage of @podman-desktop/tests-playwright to develop the podman-desktop tests in the Podman Desktop repository

This section explains how to develop your own E2E tests in the Podman Desktop repository.

Steps:

1. Get into the Podman Desktop repo folder (should be named `podman-desktop`)
2. Install its local dependencies by executing `pnpm install`
3. Build the application's tests with `pnpm test:e2e:build`
4. Now you can implement your E2E tests in the `tests/playwright` folder
5. Execute `pnpm test:e2e` in order to run them
6. When the tests finish you will find the test artifacts and logs available under `./tests/playwright/output` (this directory can be modified in the `playwright.config.ts` file)

## Usage of @podman-desktop/tests-playwright in an external repository in DEVELOPMENT mode

This section explains how to add the npm package to a repository external to podman-desktop.

Steps:

1. Get into the Podman Desktop repo folder (should be named `podman-desktop`)
2. Install its local dependencies by executing `pnpm install`
3. Implement your changes to the E2E tests library (optional)
4. Build the application and tests with `pnpm test:e2e:build`
5. Set an environment variable by executing: `export PODMAN_DESKTOP_ARGS="/path/to/podman-desktop"` (the current directory) [¹]
6. Get into YOUR repository and update the `package.json` file to have the following contents:

- Under `devDependencies`:
  - `"@podman-desktop/tests-playwright": "next",`[²]
  - `"@playwright/test": "^1.48.1"` (or the current latest)
- Under `scripts`:
  - `"test:e2e:setup": "xvfb-maybe --auto-servernum --server-args='-screen 0 1280x960x24' --"` [³]
  - `"test:e2e": "cross-env npm run test:e2e:setup npx playwright test tests/src"`

7. Execute `pnpm install`, which should extract the contents of the previously built Podman Desktop into the `node_modules` folder in your repository
8. Write your E2E tests on your repository, which may use your changes to `@podman-desktop/tests-playwright` from step 3 (optional)
9. Run your E2E tests by executing `pnpm test:e2e`

### Running in e2e tests in PRODUCTION mode

You can skip steps 1 through 4 and set `PODMAN_DESKTOP_BINARY` if you have compiled it or downloaded before and want to run in PRODUCTION mode.

[¹] Remember that environment variables defined this way only work on the terminal they were defined and only for as long as the terminal is active.

Using the value `next` works for running tests locally, but for remote executions, specify the latest version of the `@podman-desktop/tests-playwright` package. Check the “Versions” tab here to find the latest version. This version will be written into the `pnpm-lock.yaml` file; to ensure you use the latest version in the future, force an update with `pnpm add -D @podman-desktop/tests-playwright@next` (use the `-w` flag in monorepos to install at the workspace root).

[³] If your project does not already have the `xvfb-maybe` dependency, you'll need to add it as well.

## How to develop and test @podman-desktop/tests-playwright locally

This section references how to use @podman-desktop/tests-playwright generated archive file for local development

1. Get into the Podman Desktop repo folder (should be named `podman-desktop`)
2. Get into the `tests/playwright` folder and install its local dependencies by executing `pnpm install`
3. Implement your changes to the E2E tests library (it can be found under `tests/playwright`)
4. Create the local package with `pnpm run package` which also builds the code. This will produce a `.tgz`archive
5. Set the environment variable by executing: `export PODMAN_DESKTOP_ARGS="path/to/podman-desktop"` (not the current directory, two folders up)
6. In YOUR repository, update the `package.json` file to have the following contents under `devDependencies`:
   `"@podman-desktop/tests-playwright": "file:../podman-desktop/tests/playwright/podman-desktop-1.20.0-next.tgz"`
7. Execute `pnpm install`, which should extract the contents of the previously built Podman Desktop package into the `node_modules` folder in your repository
8. Now, the changes you made to `@podman-desktop/tests-playwright` should be available in your project. If the process was successful, you should be able to find the classes you added in the `index.d.ts` file under `node_modules/@podman-desktop/tests-playwright/dist`
9. You might need to remove `node_modules` to force new installation
