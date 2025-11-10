# Networking Group Management Challenge

A full-stack application for managing networking group member intentions and approvals. Built with Next.js, Express, and SQLite.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Contributing](#contributing)

## Overview

This application provides a complete workflow for managing user intentions to join a networking group. It includes:

- **Public Form**: Users can submit their intention to join
- **Admin Dashboard**: Review and approve/reject user intentions
- **Token System**: Approved users receive a unique token
- **Profile Completion**: Token holders can complete their full profile with additional demographic information
- **Analytics Dashboard**: View statistics and trends of user data

## Features

### User Features

- Submit intention form with basic information (name, email, company, purpose)
- Receive and validate unique approval token
- Complete extended profile with optional fields (gender, city, state, country, birthdate)
- Token-based authentication for profile updates

### Admin Features

- Password-protected admin panel
- View all pending user intentions
- Approve or reject applications
- View detailed user information in modals
- Dashboard with statistics and charts:
  - Total users vs approved users
  - Approval rate visualization
  - User recommendations and thank-you counts

### Security

- Bcrypt password hashing
- Token-based user verification
- Protected routes and API endpoints
- SQL injection prevention
- CORS configuration

## Tech Stack

### Frontend (`/client`)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **State Management**: React Context
- **Architecture**: Clean Architecture (Domain, Application, Infrastructure layers)
- **Testing**: Jest + React Testing Library

### Backend (`/server`)

- **Framework**: Express 5
- **Language**: TypeScript
- **Database**: SQLite
- **Authentication**: bcrypt
- **API**: RESTful
- **Testing**: Jest + Supertest
- **Development**: ts-node-dev (hot reload)

## Project Structure

```
networking-group-management-challenge/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── (private)/         # Protected routes
│   │   │   │   ├── admin/         # Admin dashboard
│   │   │   │   │   └── dashboard/ # Analytics & charts
│   │   │   │   └── full-form/     # Profile completion form
│   │   │   ├── (public)/          # Public routes
│   │   │   │   └── form/          # Intention submission form
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx           # Home page (token verification)
│   │   ├── lib/                   # Utilities
│   │   └── presentation/          # UI components
│   ├── application/               # Use cases
│   ├── domain/                    # Entities & DTOs
│   ├── infrastructure/            # External services (API, repositories)
│   └── shared/                    # Shared context & hooks
│
├── server/                         # Backend application
│   ├── src/
│   │   ├── controllers/           # Request handlers
│   │   ├── services/              # Business logic
│   │   ├── repositories/          # Data access layer
│   │   ├── models/                # TypeScript interfaces
│   │   ├── routes/                # API routes
│   │   ├── db/                    # Database configuration
│   │   └── helpers/               # Utility functions
│   └── server.ts                  # Application entry point
│
└── README.md                      # This file
```

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 8.x or higher

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/PedroHAMartins/networking-group-management-challenge.git
cd networking-group-management-challenge
```

2. **Install dependencies**

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

## Environment Variables

### Backend (`/server/.env`)

Create a `.env` file in the server directory:

```env
PORT=4000
ADMIN_PASSWORD=PASSWORD_VALUE_PREVIOUSLY_DETERMINED
```

### Frontend (`/client/.env.local`)

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NEXT_PUBLIC_ADMIN_PASSWORD_KEY=DESIRED_PASSWORD
```

## Running the Application

### Development Mode

1. **Start the backend server** (from `/server`):

```bash
npm run dev
```

Server will run on `http://localhost:4000`

2. **Start the frontend** (from `/client`):

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Production Build

**Backend**:

```bash
npm run build
npm start
```

**Frontend**:

```bash
npm run build
npm start
```

## Testing

### Frontend Tests

```bash
cd client
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Backend Tests

```bash
cd server
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

## API Documentation

### Base URL

```
http://localhost:4000/api
```

### Endpoints

#### Users

| Method | Endpoint             | Description               | Auth Required |
| ------ | -------------------- | ------------------------- | ------------- |
| POST   | `/users`             | Create new user intention | No            |
| GET    | `/users`             | Get all users             | No            |
| GET    | `/users/intentions`  | Get pending intentions    | No            |
| GET    | `/users/data`        | Get user statistics       | No            |
| POST   | `/users/token`       | Verify user token         | No            |
| PUT    | `/users/:id`         | Update user profile       | Token         |
| PUT    | `/users/approve/:id` | Approve/reject user       | Admin         |

#### Variables

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | `/variables/validate` | Validate admin password |

````

## Architecture

### Frontend Architecture

The client follows **Clean Architecture** principles:

- **Domain Layer**: Entities and DTOs (data contracts)
- **Application Layer**: Use Cases (business logic)
- **Infrastructure Layer**: External services (HTTP client, repositories)
- **Presentation Layer**: React components and UI

**Key Patterns**:
- Custom hooks (`useUseCase`, `useAsync`) for stable callbacks
- Context providers for global state (Header, Notifications)
- Repository pattern for API abstraction
- Form builders with Zod schema validation

### Backend Architecture

The server follows **MVC pattern** with layered architecture:

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and validation
- **Repositories**: Database operations
- **Models**: Type definitions

**Key Features**:
- SQL parameter binding (positional parameters)
- Route ordering (specific before general routes)
- Error handling middleware
- Database initialization with migrations

## User Flow

1. **User submits intention form** → Creates pending user record
2. **Admin reviews intention** → Approves or rejects
3. **System generates token** → Unique 6-character token for approved users
4. **User receives token** → Via email (simulated) or displayed
5. **User validates token** → On home page
6. **User completes profile** → Redirected to full-form with pre-filled data
7. **Profile updated** → Additional demographic information saved

## UI Components

### Custom Components
- **FormBuilder**: Dynamic form generator with validation
- **Table**: Sortable data table with actions
- **Modal**: Reusable dialog component
- **OTP Input**: 6-digit token input
- **Cards**: Dashboard statistic cards
- **Charts**: Bar charts for analytics

### UI Library
- Buttons, Inputs, Selects (Radix UI)
- Checkboxes, Radio Groups
- Dialogs, Separators
- Card components

## Security Considerations

- Passwords hashed with bcrypt (10 salt rounds)
- Token-based verification for profile updates
- Protected admin routes
- SQL injection prevention via parameterized queries
- CORS enabled for specified origins
- Environment variables for sensitive data

## Known Issues & Solutions

### Route Order
Express matches routes in order. Specific routes must come before parameterized routes:
```javascript
router.get("/users/data", ...)        // Specific first
router.get("/users/intentions", ...)  // Specific first
router.get("/users", ...)              // General last
````

### SQL Parameter Binding

SQLite requires positional parameters in exact order:

```javascript
await db.run(sql, [param1, param2, param3]); // Correct
await db.run(sql, { $param1, $param2 }); // Incorrect
```

## License

This project is part of a coding challenge for AG Sistemas.

## Contributors

- Pedro Martins - [@PedroHAMartins](https://github.com/PedroHAMartins)

## Contact

For questions or support, please contact: pedrohamartins@outlook.com
