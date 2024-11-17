# Project Setup Instructions

This document contains all the necessary steps to set up the project locally.

---

## Prerequisites

Before starting, ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org) (LTS)
- [npm](https://www.npmjs.com/) (Node Package Manager)

---

## Step 1: Create Environment Variables

Each of the following folders contains an `.example.env` file. Use it as a template to create a `.env` file:

- **apps/user-app**
- **apps/admin-app**
- **packages/db**

Run the following command in each of these folders:
```bash
cp .example.env .env
```

After copying, fill in the required values in each `.env` file according to your environment.

## Step 2: Install Dependencies
Navigate to the root directory `(PAYOP)` and install the necessary dependencies:

```
cd PAYOP
npm install
```

## Step 3: Set Up the Database
Navigate to the `packages/db` folder and run the following commands to set up the database:

1. **Generate a new migration**:

    ```
    cd packages/db
    npx prisma migrate dev --name initialize
    Generate the Prisma client:
    ```
2. **Generate the Prisma client**:

    ```
    npx prisma generate
    ```

**Notes**

Ensure all `.env` files are configured correctly before running any commands.
If you encounter issues, refer to the Prisma documentation or project-specific setup notes.
For additional troubleshooting, consult the README or related documentation provided in the project.