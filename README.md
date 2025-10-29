# insurance-claims

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [RunApp](#runApp)
- [WishList](#wishlist)

## Overview
Insurance Claim Evaluation System - an incoming claim is validated, matched to a policy, processed through business logic, and outputs a claim evaluation. 

![img.png](img.png)

## Features
- src/: Source code for the insurance claim evaluation system.
    - types/: Type definitions for claims, policies, and evaluation results.
    - logic/: Business logic for evaluating claims against policies.
    - data/: Sample data for policies.
    - index.ts: Main entry point for the evaluation system.
- tests/: Unit tests and integration tests for the system.
- package.json: Project metadata and dependencies.
- tsconfig.json: TypeScript configuration file.
- README.md: Project documentation.

## Installation
1. Clone the repository
2. Install dependencies using your preferred package manager (e.g., npm, yarn)
    - npm install
4. Run tests to ensure everything is set up correctly
    - npm test
5. Trubble shooting
    - Ensure Node.js and TypeScript are installed
    - Check for any missing dependencies in package.json

## RunApp
1. Ensure TypeScript is compiled:
   - npx tsc
2. To change the raw incoming claim
   - Modify the rawClaim object in runHandleClaim.ts
   - you can also modify the policies it will be evaluated against in src/data/policies.ts
3. Run the application using ts-node:
   - npx ts-node runHandleClaim.ts

## WishList
- [ ] Implement a user interface for easier claim submission and policy submission
- [ ] Integrate with external databases for policy and claim storage
- [ ] Enhance logging and monitoring for claim evaluations
- [ ] Time went a lot faster than I thought it would, I would have liked to also better elaborate documentation.

## Decisions
- TypeScript was chosen for its strong typing and ability to catch errors at compile time.
- Zod was used for schema validation to ensure incoming claims conform to expected structures.
- The project structure was designed to separate concerns, making it easier to maintain and extend.
- Unit tests and integration tests to ensure the reliability of the system and extendibility.
