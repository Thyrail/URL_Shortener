/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';
  
export class TokenGuard implements CanActivate 
{
  canActivate(context: ExecutionContext): boolean 
  {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['thy-api-token'];
    return token === '6c9c91c7d1334b859ab5cb2bf2df33282f5014f9e84e379c5d79be658a821f78bc476b940adea677fe107a59148ca18bdbcd91c11ff54035d61a479b39d796a1';
  }
}