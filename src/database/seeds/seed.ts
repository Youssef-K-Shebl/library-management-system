import 'dotenv/config';
import dataSource from '../data-source';
import { Book } from '../../books/entities/book.entity';
import { Borrower } from '../../borrowers/entities/borrower.entity';
import { Borrowing } from '../../borrowing/entities/borrowing.entity';

const books: Partial<Book>[] = [
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', availableQuantity: 5, shelfLocation: 'A1' },
  { title: '1984', author: 'George Orwell', isbn: '9780451524935', availableQuantity: 3, shelfLocation: 'A2' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', availableQuantity: 4, shelfLocation: 'A3' },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', isbn: '9780060883287', availableQuantity: 2, shelfLocation: 'B1' },
  { title: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060850524', availableQuantity: 6, shelfLocation: 'B2' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769488', availableQuantity: 3, shelfLocation: 'C1' },
  { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', availableQuantity: 7, shelfLocation: 'C3' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', availableQuantity: 10, shelfLocation: 'D1' },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '9781451673319', availableQuantity: 4, shelfLocation: 'D4' },
  { title: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780062315007', availableQuantity: 1, shelfLocation: 'E5' },
];

const borrowers: Partial<Borrower>[] = [
  { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { name: 'Bob Williams', email: 'bob.williams@example.com' },
  { name: 'Clara Martinez', email: 'clara.martinez@example.com' },
  { name: 'David Kim', email: 'david.kim@example.com' },
  { name: 'Eva Chen', email: 'eva.chen@example.com' },
];

async function seed() {
  await dataSource.initialize();
  console.log('Data source initialized.');

  const bookRepo = dataSource.getRepository(Book);
  const borrowerRepo = dataSource.getRepository(Borrower);
  const borrowingRepo = dataSource.getRepository(Borrowing);

  // Upsert books (skip on ISBN conflict)
  const savedBooks = await Promise.all(
    books.map(async (book) => {
      const existing = await bookRepo.findOne({ where: { isbn: book.isbn } });
      if (existing) return existing;
      return bookRepo.save(bookRepo.create(book));
    }),
  );
  console.log(`Seeded ${savedBooks.length} books.`);

  // Upsert borrowers (skip on email conflict)
  const savedBorrowers = await Promise.all(
    borrowers.map(async (borrower) => {
      const existing = await borrowerRepo.findOne({ where: { email: borrower.email } });
      if (existing) return existing;
      return borrowerRepo.save(borrowerRepo.create(borrower));
    }),
  );
  console.log(`Seeded ${savedBorrowers.length} borrowers.`);

  // Seed borrowings only if none exist yet
  const borrowingCount = await borrowingRepo.count();
  if (borrowingCount === 0) {
    const now = new Date();
    const daysMs = 24 * 60 * 60 * 1000;

    const borrowings: Partial<Borrowing>[] = [
      // Active borrowings (no return date)
      {
        bookId: savedBooks[0].id,
        borrowerId: savedBorrowers[0].id,
        dueDate: new Date(now.getTime() + 14 * daysMs),
      },
      {
        bookId: savedBooks[2].id,
        borrowerId: savedBorrowers[1].id,
        dueDate: new Date(now.getTime() + 7 * daysMs),
      },
      {
        bookId: savedBooks[7].id,
        borrowerId: savedBorrowers[4].id,
        dueDate: new Date(now.getTime() - 3 * daysMs), // overdue
      },
      // Returned borrowings
      {
        bookId: savedBooks[1].id,
        borrowerId: savedBorrowers[2].id,
        dueDate: new Date(now.getTime() - 10 * daysMs),
        returnDate: new Date(now.getTime() - 12 * daysMs),
      },
      {
        bookId: savedBooks[5].id,
        borrowerId: savedBorrowers[3].id,
        dueDate: new Date(now.getTime() - 5 * daysMs),
        returnDate: new Date(now.getTime() - 7 * daysMs),
      },
    ];

    await borrowingRepo.save(borrowings.map((b) => borrowingRepo.create(b)));
    console.log(`Seeded ${borrowings.length} borrowings.`);
  } else {
    console.log(`Skipped borrowings (${borrowingCount} already exist).`);
  }

  await dataSource.destroy();
  console.log('Seeding complete.');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
