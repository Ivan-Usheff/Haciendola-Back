import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';

dotenv.config();
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate( context: ExecutionContext ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY, 
      [
        context.getHandler(),
        context.getClass(),
      ]
    );
    
    if (isPublic) {
      // See this condition
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      // We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = {id: payload.sub, user: payload.user};
    } catch(error) {
      console.log("🚀 ~ AuthGuard ~ request.headers:", request.headers)
      console.log("🚀 ~ AuthGuard ~ canActivate ~ error:", error)
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    try{
      const [type, token] = request.headers['authorization'].split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    } catch(error) {
      console.log("🚀 ~ AuthGuard ~ canActivate ~ error:", error)
      throw new UnauthorizedException();
    }
  }
}
