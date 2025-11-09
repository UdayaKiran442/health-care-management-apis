## Setting up the Project

Install dependencies:
```sh
bun install
```

Run the server:
```sh
bun run dev
```

open http://localhost:3000

## For generating migration scripts

npx drizzle-kit generate

## Folder Structure

src/
├── controllers/
├── exceptions/
├── repositories/
├── routes/
├── services/
├── utils/
└── index.ts
└── README.md
└── drizzle.config.ts
└── .env.*
└── package.json
└── tsconfig.json
└── .gitignore

### Controllers
- Controllers are used to handle the business logic of the application, to call services or repositories

### Exceptions
- Exceptions are used to handle the errors that occur in the application.
- Example AddUserError

### Repositories
- Repositories are used to handle the database operations of the applications, such as adding, updating, deleting, and fetching data from the database.
- This do not contain core business logic of the application.

### Routes
- Routes are used to handle the routing of the application.
- Utilised zod to validate the request body and to create schema for the payload.

### Services
- Services are used to call third party APIs or sdk's such as openai, google, etc.

### Utils
- Utilities are used to handle reusable functions for the application.

### Index
- Contains core server of the application.
- Handles the routing of the application, cors and other middleware.

### README.md
- Contains the documentation of the application.
- Includes installation and setup instructions, api documentation, and other relevant information.

### .env
- Contains the environment variables for the application.
- Should not be committed to the repository.

## API Documentation

### Admin Route

**Create Admin**
Description: This route is for creating admin for the clinic.

Payload:
```
name: string
email: string
password: string
```