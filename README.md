# metavana [![Version](https://img.shields.io/npm/v/metavana)](https://www.npmjs.com/package/metavana) [![License](https://img.shields.io/github/license/jlachniet/metavana)](LICENSE)

_A CLI for generating high-quality web metadata and icons._

## Usage

See [metavana.dev](https://metavana.dev) for documentation on usage.

## Development

metavana uses [Yarn 1](https://classic.yarnpkg.com/) as a package manager for development.

```bash
# Clone the repository from GitHub
git clone https://github.com/jlachniet/metavana.git
cd metavana

# Install the dependencies
yarn install

# Build the project
yarn build
```

metavana is intended to be edited in [Visual Studio Code](https://code.visualstudio.com/) using the official [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugins. The included [settings.json](.vscode/settings.json) will configure Visual Studio Code to automatically format and remove unused imports on save.

The project can be linted using the `yarn lint` command, and tested using the `yarn test` command. All code must pass linting and testing before being committed. Coverage can be generated via `yarn coverage`, which generates to the `coverage` folder.

Documentation is handled by VitePress. To start the VitePress server, run `yarn docs:dev`.

## License

metavana is released under the MIT License. For more information, please see the [LICENSE](LICENSE) file. Files generated by metavana are not subject to this license.