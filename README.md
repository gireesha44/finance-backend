# Finance Data Processing and Access Control Backend

A RESTful backend API for a finance dashboard system with role-based access control, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## Features

- JWT based authentication
- Role based access control (Admin, Analyst, Viewer)
- Financial records management with soft delete
- Dashboard summary analytics
- Category wise breakdown
- Monthly trends
- Pagination and filtering on records
- Input validation and error handling

## Roles and Permissions

| Action | Viewer | Analyst | Admin |
|---|---|---|---|
| Register/Login | ✅ | ✅ | ✅ |
| View Records | ✅ | ✅ | ✅ |
| View Dashboard | ❌ | ✅ | ✅ |
| Create Records | ❌ | ❌ | ✅ |
| Update Records | ❌ | ❌ | ✅ |
| Delete Records | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

## Project Structure
finance-backend/
├── src/
│   ├── config/         # Database connection
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── controllers/    # Request/response handling
│   ├── services/       # Business logic
│   ├── middleware/     # Auth and role middleware
│   └── validators/     # Input validation
├── seed.js             # Test data seeder
├── app.js
├── server.js
└── README.md

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/gireesha44/finance-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

4. Run the server
```bash
npm run dev
```

5. (Optional) Seed test data
```bash
node seed.js
```

## API Documentation

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |

### User Routes (Admin only)

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get user by ID |
| PATCH | /api/users/:id/role | Update user role |
| PATCH | /api/users/:id/status | Update user status |

### Record Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/records | Create record | Admin |
| GET | /api/records | Get all records | All roles |
| GET | /api/records/:id | Get record by ID | All roles |
| PATCH | /api/records/:id | Update record | Admin |
| DELETE | /api/records/:id | Delete record (soft) | Admin |

### Query Filters on GET /api/records
?type=income
?type=expense
?category=food
?from=2026-01-01&to=2026-12-31
?page=1&limit=10

### Dashboard Routes (Analyst and Admin)

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/dashboard/summary | Total income, expense, net balance |
| GET | /api/dashboard/by-category | Category wise totals |
| GET | /api/dashboard/trends | Monthly trends |
| GET | /api/dashboard/recent | Last 10 transactions |

## Example Requests

### Register
```json
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "admin"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

### Create Record
```json
POST /api/records
Authorization: Bearer your_token_here

{
  "amount": 50000,
  "type": "income",
  "category": "salary",
  "date": "2026-01-01",
  "notes": "January salary"
}
```

## Assumptions Made

- Any user can register with any role for testing purposes
- Soft delete is used for records so data is never permanently lost
- Viewer role can see records but not dashboard analytics
- Analyst role can see records and dashboard but cannot modify data
- Admin has full access to everything

## What I Would Improve With More Time

- Add rate limiting to prevent API abuse
- Add unit and integration tests
- Add search functionality on records
- Add refresh token support
- Deploy to a cloud platform like Railway or Render


