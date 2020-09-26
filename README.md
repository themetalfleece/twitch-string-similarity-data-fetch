Uses a twitch bot to communicate with the [string-similarity-data-fetch](https://github.com/themetalfleece/string-similarity-data-fetch) server.

## Install

1. Install [node.js](https://nodejs.org/en/download/), [yarn](https://classic.yarnpkg.com/en/docs/install/).
2. Clone this repository, and using a terminal navigate to its directory.
3. Run `yarn` to install the dependencies.

## Build & Run

1. Copy the contents of the `.env.example` file to a `.env` next to it, and edit it with your values.
2. Run `yarn build` to build the files.
3. Run `yarn start` to start the application.

-   You can run `yarn dev` to combine the 2 steps above, while listening to changes and restarting automatically.
    -   You need to run `yarn global add ts-node` once for this to run.

## Linting & Formatting

-   Run `yarn lint` to lint the code.
-   Run `yarn format` to format the code.
