import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  // Application
  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV')!;
  }

  get port(): number {
    return this.configService.get<number>('PORT')!;
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  // Database
  get dbHost(): string {
    return this.configService.get<string>('DB_HOST')!;
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT')!;
  }

  get dbUsername(): string {
    return this.configService.get<string>('DB_USERNAME')!;
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD')!;
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME')!;
  }

  // Auth
  get authUsername(): string {
    return this.configService.get<string>('AUTH_USERNAME')!;
  }

  get authPassword(): string {
    return this.configService.get<string>('AUTH_PASSWORD')!;
  }

  // Rate Limiting
  get throttleTtl(): number {
    return this.configService.get<number>('THROTTLE_TTL')!;
  }

  get throttleLimit(): number {
    return this.configService.get<number>('THROTTLE_LIMIT')!;
  }
}
