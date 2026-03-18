import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Book } from './entities/book.entity';

export function ApiCreateBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new book' }),
    ApiResponse({
      status: 201,
      description: 'Book created successfully',
      type: Book,
    }),
    ApiResponse({ status: 400, description: 'Validation error' }),
  );
}

export function ApiFindAllBooks() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all books' }),
    ApiResponse({
      status: 200,
      description: 'List of all books',
      type: [Book],
    }),
  );
}

export function ApiSearchBooks() {
  return applyDecorators(
    ApiOperation({ summary: 'Search books by title, author, or ISBN' }),
    ApiQuery({ name: 'query', description: 'Search term', example: 'Gatsby' }),
    ApiResponse({ status: 200, description: 'Search results', type: [Book] }),
  );
}

export function ApiFindOneBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a book by ID' }),
    ApiParam({ name: 'id', description: 'Book UUID' }),
    ApiResponse({ status: 200, description: 'Book found', type: Book }),
    ApiResponse({ status: 404, description: 'Book not found' }),
  );
}

export function ApiUpdateBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a book' }),
    ApiParam({ name: 'id', description: 'Book UUID' }),
    ApiResponse({
      status: 200,
      description: 'Book updated successfully',
      type: Book,
    }),
    ApiResponse({ status: 404, description: 'Book not found' }),
  );
}

export function ApiDeleteBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a book' }),
    ApiParam({ name: 'id', description: 'Book UUID' }),
    ApiResponse({ status: 204, description: 'Book deleted successfully' }),
    ApiResponse({ status: 404, description: 'Book not found' }),
  );
}
