import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Borrowing } from './entities/borrowing.entity';

export function ApiCheckout() {
  return applyDecorators(
    ApiOperation({ summary: 'Check out a book to a borrower' }),
    ApiResponse({ status: 201, description: 'Book checked out successfully', type: Borrowing }),
    ApiResponse({ status: 400, description: 'Book not available or validation error' }),
    ApiResponse({ status: 404, description: 'Book or borrower not found' }),
  );
}

export function ApiReturn() {
  return applyDecorators(
    ApiOperation({ summary: 'Return a borrowed book' }),
    ApiResponse({ status: 201, description: 'Book returned successfully', type: Borrowing }),
    ApiResponse({ status: 404, description: 'Active borrowing not found' }),
  );
}

export function ApiGetOverdue() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all overdue borrowings' }),
    ApiResponse({ status: 200, description: 'List of overdue borrowings', type: [Borrowing] }),
  );
}
