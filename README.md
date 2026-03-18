# Library Management System

A RESTful API for managing books, borrowers, and borrowing operations. Built with NestJS and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js 20
- **Framework:** NestJS 11
- **Language:** TypeScript 5
- **Database:** PostgreSQL 16 with TypeORM (see [database.md](database.md) for full schema)
- **Authentication:** HTTP Basic Auth (Passport)
- **Validation:** class-validator / class-transformer
- **API Docs:** Swagger (OpenAPI) at `/api/docs`
- **Rate Limiting:** @nestjs/throttler
- **Reports Export:** CSV (json2csv) and XLSX (exceljs)
- **Containerization:** Docker & Docker Compose

## Authentication

All endpoints are protected with HTTP Basic Auth.

| | Default value |
|---|---|
| **Username** | `admin` |
| **Password** | `secret` |

These are configurable via `AUTH_USERNAME` and `AUTH_PASSWORD` environment variables.

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+ (or Docker)

### Option 1: Docker Compose (recommended)

```bash
git clone https://github.com/Youssef-K-Shebl/library-management-system.git
cd library-management-system
docker compose up --build
```

This starts both PostgreSQL and the application, runs migrations and seeds automatically. The API is available at `http://localhost:3000`.

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Youssef-K-Shebl/library-management-system.git
   cd library-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** — copy `.env.example` and adjust as needed:
   ```bash
   cp .env.example .env
   ```

4. **Start PostgreSQL** — either locally or via Docker:
   ```bash
   docker compose up postgres -d
   ```

5. **Run migrations and seed data**
   ```bash
   npm run migration:run
   npm run seed
   ```

6. **Start the application**
   ```bash
   # Development (watch mode)
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NODE_ENV` | `development` | Environment mode |
| `PORT` | `3000` | Server port |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USERNAME` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
| `DB_NAME` | `library_db` | Database name |
| `AUTH_USERNAME` | `admin` | Basic auth username |
| `AUTH_PASSWORD` | `secret` | Basic auth password |
| `THROTTLE_TTL` | `60` | Rate limit window (seconds) |
| `THROTTLE_LIMIT` | `10` | Max requests per window |

## API Endpoints

Base URL: `http://localhost:3000/api`

Interactive Swagger docs: `http://localhost:3000/api/docs`

All endpoints require Basic Auth header: `Authorization: Basic base64(username:password)`

---

### Books

#### `POST /api/books` — Create a book

**Request body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "availableQuantity": 5,
  "shelfLocation": "A-3-14"
}
```

**Response `201`:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "availableQuantity": 5,
  "shelfLocation": "A-3-14",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### `GET /api/books` — List all books

**Response `200`:** Array of book objects.

#### `GET /api/books/search?query={term}` — Search books

Searches by title, author, or ISBN using trigram matching.

| Query Param | Type | Description |
|---|---|---|
| `query` | string | Search term |

**Response `200`:** Array of matching book objects.

#### `GET /api/books/:id` — Get a book by ID

**Response `200`:** Book object.

**Response `404`:** `{ "message": "Book not found" }`

#### `PUT /api/books/:id` — Update a book

**Request body** (all fields optional):
```json
{
  "title": "Updated Title",
  "availableQuantity": 10
}
```

**Response `200`:** Updated book object.

#### `DELETE /api/books/:id` — Delete a book

**Response `204`:** No content.

---

### Borrowers

#### `POST /api/borrowers` — Register a borrower

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Response `201`:**
```json
{
  "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "registeredDate": "2024-01-15T10:30:00.000Z"
}
```

#### `GET /api/borrowers` — List all borrowers

**Response `200`:** Array of borrower objects.

#### `GET /api/borrowers/:id` — Get a borrower by ID

**Response `200`:** Borrower object.

**Response `404`:** `{ "message": "Borrower not found" }`

#### `GET /api/borrowers/:id/borrowings` — Get a borrower's borrowings

**Response `200`:** Array of borrowing objects for the given borrower.

#### `PUT /api/borrowers/:id` — Update a borrower

**Request body** (all fields optional):
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

**Response `200`:** Updated borrower object.

#### `DELETE /api/borrowers/:id` — Delete a borrower

**Response `204`:** No content.

---

### Borrowings

#### `POST /api/borrowings/checkout` — Check out a book

**Request body:**
```json
{
  "bookId": "550e8400-e29b-41d4-a716-446655440000",
  "borrowerId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
}
```

**Response `201`:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "bookId": "550e8400-e29b-41d4-a716-446655440000",
  "borrowerId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "checkoutDate": "2024-01-15T10:30:00.000Z",
  "dueDate": "2024-01-29T10:30:00.000Z",
  "returnDate": null
}
```

#### `POST /api/borrowings/return` — Return a book

**Request body:**
```json
{
  "bookId": "550e8400-e29b-41d4-a716-446655440000",
  "borrowerId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
}
```

**Response `201`:** Updated borrowing object with `returnDate` set.

#### `GET /api/borrowings/overdue` — List overdue borrowings

**Response `200`:** Array of borrowing objects where `dueDate` has passed and `returnDate` is null.

---

### Reports

#### `GET /api/reports/borrowings?from={date}&to={date}` — Borrowing report

| Query Param | Type | Description |
|---|---|---|
| `from` | ISO date string | Start date (e.g., `2024-01-01`) |
| `to` | ISO date string | End date (e.g., `2024-12-31`) |

**Response `200`:** Borrowing analytics for the given date range.

#### `GET /api/reports/borrowings/export?from={date}&to={date}&format={fmt}` — Export borrowings

| Query Param | Type | Required | Description |
|---|---|---|---|
| `from` | ISO date string | Yes | Start date |
| `to` | ISO date string | Yes | End date |
| `format` | `csv` \| `xlsx` | No (default: `csv`) | Export format |

**Response:** File download (`text/csv` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`).

#### `GET /api/reports/overdue/export?format={fmt}` — Export overdue borrowings

| Query Param | Type | Required | Description |
|---|---|---|---|
| `format` | `csv` \| `xlsx` | No (default: `csv`) | Export format |

**Response:** File download of all currently overdue borrowings.

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```
