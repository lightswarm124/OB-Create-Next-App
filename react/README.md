# React Client for Open Bounty

## Installation

Clone to local project directory and create a development branch

`npm install`

## Run development environment

`npm run start`

## Linting

`npm run lint`

`npm run lint:fix` to automatically fix some errors

## Run unit tests

`npm run test`

## Build production bundle

`npm run deploy:prod`

Bundle will be available in dist directory

Note that build variables for production can be modified in

./config/project.config.js

## Assumptions

The OpenBounty react front end is designed and developed with three types of integrations in mind:

1. GitHub API integration (completed)
2. OpenBounty API integration
3. Web3 integration with the Ethereum network

Integration hooks can be found in ./src/services, in the repective API services files.

After evalution of the business objective, we believe OpenBounty will need to develop an API service to support GitHub authentication and overall tracking of registered repositories and their associated bounties and Etereum wallet ids.  

It is advised that the use of Ethereum Smart Contracts be limited to token transfer and processing to reduce contract execution costs.  When a feature can be fulfilled using the OpenBounty API service, it probably should be.