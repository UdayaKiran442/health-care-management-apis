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

```
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
```

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

Base Path: /v1/admin

**Create Admin**
Description: This route is for creating admin for the clinic.

Route: /create

Method: POST

Payload:
```ts
name: string
email: string
password: string
```

Response:
```ts
[
  {
    adminId: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  },
  {
    userId: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
]
```
**Assign Doctor**
Description: Admin can register a doctor for the clinic

Route: /assign-doctor

Method: POST

Payload:
```ts
name: string,
email: string,
passwordL string
specialization: string,
department: string
```

Response:
```ts
[{
    doctorId: string;
    name: string;
    email: string;
    passwordHash: string;
    specialization: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
},{
    userId: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}]
```

**Assign Patient**
Decription: Can register new patient for the clinic

Path: /assign-patient

Method: POST

Payload:
```ts
name: string,
email: string,
passwordL string
phone: string,
```

Response
```ts
[{
    patientId: string;
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}, {
    userId: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}]
```

**Fix Appointment**
Description: Can schedule an appointment for the patient with the doctor

Path: /fix-appointment

Method: POST

Payload:
```ts
{
  patientId: string,
  doctorId: string,
  appointmentDateString: string,
  reasonForVisit: string
}
```

Response:
```ts
{
    appointmentId: string;
    patientId: string;
    doctorId: string;
    appointmentDate: Date;
    reasonForVisit: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
```
**Check In Patient**
Description: To check in patient who came for treatment during the scheduled appointment time.

Path: /checkin-patient

Method: POST

Payload:
```ts
appointmentId: string
```

