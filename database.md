# Database Schema

PostgreSQL database with 3 tables managed via TypeORM migrations.

## Entity Relationship Diagram

```
┌──────────────────────┐       ┌──────────────────────────┐       ┌──────────────────────┐
│        books         │       │       borrowings          │       │      borrowers       │
├──────────────────────┤       ├──────────────────────────┤       ├──────────────────────┤
│ id (PK, UUID)        │──┐    │ id (PK, UUID)            │    ┌──│ id (PK, UUID)        │
│ title (VARCHAR 255)  │  └───>│ book_id (FK, UUID)       │    │  │ name (VARCHAR 255)   │
│ author (VARCHAR 255) │       │ borrower_id (FK, UUID)   │<───┘  │ email (VARCHAR 255)  │
│ isbn (VARCHAR 13)    │       │ checkout_date (TIMESTAMP) │       │ registered_date (TS) │
│ available_quantity   │       │ due_date (TIMESTAMP)     │       └──────────────────────┘
│ shelf_location       │       │ return_date (TIMESTAMP)  │
│ created_at (TS)      │       └──────────────────────────┘
│ updated_at (TS)      │
└──────────────────────┘
```

## Tables

### `books`

| Column             | Type         | Constraints                | Description              |
|--------------------|--------------|----------------------------|--------------------------|
| `id`               | UUID         | PK, auto-generated         | Unique book identifier   |
| `title`            | VARCHAR(255) | NOT NULL, trigram indexed   | Book title               |
| `author`           | VARCHAR(255) | NOT NULL, trigram indexed   | Author name              |
| `isbn`             | VARCHAR(13)  | NOT NULL, UNIQUE, trigram indexed | ISBN-13 code       |
| `available_quantity` | INTEGER    | NOT NULL, DEFAULT 0        | Copies available to lend |
| `shelf_location`   | VARCHAR(100) | NOT NULL                   | Physical shelf location  |
| `created_at`       | TIMESTAMP    | NOT NULL, auto-set         | Record creation time     |
| `updated_at`       | TIMESTAMP    | NOT NULL, auto-updated     | Last update time         |

**Indexes:** `idx_books_title_trgm`, `idx_books_author_trgm`, `idx_books_isbn_trgm`

### `borrowers`

| Column            | Type         | Constraints          | Description                |
|-------------------|--------------|----------------------|----------------------------|
| `id`              | UUID         | PK, auto-generated   | Unique borrower identifier |
| `name`            | VARCHAR(255) | NOT NULL             | Borrower full name         |
| `email`           | VARCHAR(255) | NOT NULL, UNIQUE, indexed | Email address          |
| `registered_date` | TIMESTAMP    | NOT NULL, auto-set   | Registration date          |

**Indexes:** `IDX_borrowers_email`

### `borrowings`

| Column          | Type      | Constraints                     | Description                          |
|-----------------|-----------|---------------------------------|--------------------------------------|
| `id`            | UUID      | PK, auto-generated              | Unique borrowing identifier          |
| `book_id`       | UUID      | FK → books(id), NOT NULL, indexed | The borrowed book                  |
| `borrower_id`   | UUID      | FK → borrowers(id), NOT NULL, indexed | The borrower                    |
| `checkout_date` | TIMESTAMP | NOT NULL, auto-set              | When the book was checked out        |
| `due_date`      | TIMESTAMP | NOT NULL                        | When the book is due for return      |
| `return_date`   | TIMESTAMP | NULLABLE                        | When the book was returned (null = still borrowed) |

**Indexes:** `IDX_borrowings_book_id`, `IDX_borrowings_borrower_id`, `IDX_borrowings_due_date`

## Relationships

- **Book → Borrowings**: One-to-Many (a book can be borrowed multiple times)
- **Borrower → Borrowings**: One-to-Many (a borrower can have multiple borrowings)
- **Borrowing → Book**: Many-to-One via `book_id`
- **Borrowing → Borrower**: Many-to-One via `borrower_id`
