import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiHealthCheck() {
  return applyDecorators(
    ApiOperation({ summary: 'Health check' }),
    ApiResponse({ status: 200, description: 'Application is running' }),
  );
}
