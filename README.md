# Express TypesScript Starter

## Prerequisites

- TypeScript v4 or upper
- Node.js v12 or upper
- Express framework v4 or upper
- Sequelize ORM (with SQLite)

## Getting Started

- Clone the source code and navigate to project folder
- Install all dependencies
- Create the environment variables

## Usages

- `npm run build` - builds and compiles application
- `npm run lint` - checks eslint
- `npm run lint:fix` - checks eslint and fix if any errors
- `npm run server` - starts server in development mode
- `npm run test` - runs test suites
- `npm run test:coverage` - runs test with coverage
- `npm run test:watch` - watches test suites running
- `npm run watch` - builds and watches application running

## APIs

## Project Structure

```bash
.
├── README.md
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── api
│   │   ├── controllers         # api controllers
│   │   ├── index.ts            # api entry point
│   │   ├── middlewares         # api middlewares
│   │   ├── routes              # api routes
│   │   └── validations         # api validations
│   ├── config                  # configuration settings
│   ├── db                      # database connection
│   ├── models                  # data access layer: data models
│   ├── server.ts               # server entry point
│   ├── services                # service layer: business logic
│   └── utils                   # utilities: constants, helpers, logger ...
├── tests                       # all test suites
└── tsconfig.json               # TypeScript configure
```
