#  ColimaConnect - Backend

Digital platform designed to centralize local services and foster community interaction in Colima, Mexico.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.dot-js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Fedora](https://img.shields.io/badge/fedora-%235191cf.svg?style=for-the-badge&logo=fedora&logoColor=white)

## Tech Stack
* **Language:** TypeScript (Strong typing for robust code).
* **Environment:** Node.js executed with ts-node.
* **ORM:** Prisma for efficient database management and migrations.
* **Architecture:** Focused on scalability and clear separation of concerns.

## Key Features
* **Data Integrity:** Efficient relational modeling using Prisma ORM.
* **Security:** Environment variable management to protect sensitive credentials.
* **Type Safety:** Full TypeScript implementation to reduce runtime errors.

## Installation and Setup
1. Clone the repository.
2. Navigate to the directory: `cd Backend`.
3. Install dependencies: `npm install`.
4. Configure your `.env` file (based on the Prisma schema).
5. Sync the database: `npx prisma migrate dev`.
6. Start the server: `npm run dev`.

## System Architecture
This diagram describes the data flow from the client to the database through the Node.js server.

```mermaid
graph TD
    A[Client/Frontend] -->|API Requests| B[Node.js + TypeScript Server]
    B -->|Query| C[Prisma ORM]
    C -->|SQL| D[(Database)]
    D -->|Data| C
    C -->|Objects| B
    B -->|JSON Response| A
