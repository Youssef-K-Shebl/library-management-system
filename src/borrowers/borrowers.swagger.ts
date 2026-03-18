import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Borrower } from './entities/borrower.entity';
import { Borrowing } from '../borrowing/entities/borrowing.entity';

export function ApiCreateBorrower() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new borrower' }),
    ApiResponse({
      status: 201,
      description: 'Borrower created successfully',
      type: Borrower,
    }),
    ApiResponse({ status: 400, description: 'Validation error' }),
  );
}

export function ApiFindAllBorrowers() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all borrowers' }),
    ApiResponse({
      status: 200,
      description: 'List of all borrowers',
      type: [Borrower],
    }),
  );
}

export function ApiFindOneBorrower() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a borrower by ID' }),
    ApiParam({ name: 'id', description: 'Borrower UUID' }),
    ApiResponse({ status: 200, description: 'Borrower found', type: Borrower }),
    ApiResponse({ status: 404, description: 'Borrower not found' }),
  );
}

export function ApiFindBorrowerBorrowings() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all borrowings for a borrower' }),
    ApiParam({ name: 'id', description: 'Borrower UUID' }),
    ApiResponse({
      status: 200,
      description: 'List of borrowings',
      type: [Borrowing],
    }),
    ApiResponse({ status: 404, description: 'Borrower not found' }),
  );
}

export function ApiUpdateBorrower() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a borrower' }),
    ApiParam({ name: 'id', description: 'Borrower UUID' }),
    ApiResponse({
      status: 200,
      description: 'Borrower updated successfully',
      type: Borrower,
    }),
    ApiResponse({ status: 404, description: 'Borrower not found' }),
  );
}

export function ApiDeleteBorrower() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a borrower' }),
    ApiParam({ name: 'id', description: 'Borrower UUID' }),
    ApiResponse({ status: 204, description: 'Borrower deleted successfully' }),
    ApiResponse({ status: 404, description: 'Borrower not found' }),
  );
}
