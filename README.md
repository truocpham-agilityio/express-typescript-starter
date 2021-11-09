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
│   │   ├── dto                 # data transform object
│   │   ├── index.ts            # api entry point
│   │   ├── middlewares         # api middlewares
│   │   ├── routes              # api routes
│   │   └── validations         # api validations
│   ├── config
│   │   └── index.ts            # configuration settings
│   ├── core
│   │   ├── constants
│   │   ├── controllers
│   │   ├── filters
│   │   ├── handlers
│   │   ├── infra
│   │   ├── interfaces
│   │   └── services
│   ├── db
│   │   ├── dal                 # data access layer
│   │   ├── init.ts             # database connection
│   │   ├── interfaces
│   │   ├── models              # data models
│   │   └── services            # service layer: business logic
│   ├── server.ts               # server entry point
│   └── utils
│       ├── functions.ts        # utilities function
│       └── logger.ts           # utilities logger
├── tests                       # all test suites
└── tsconfig.json               # TypeScript configure
```
