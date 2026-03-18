import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { EnvConfigService } from '../../config';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly envConfig: EnvConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Missing Basic authentication');
    }

    const base64Credentials = authHeader.slice(6);
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );
    const [username, password] = credentials.split(':');

    if (
      username !== this.envConfig.authUsername ||
      password !== this.envConfig.authPassword
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }
}
