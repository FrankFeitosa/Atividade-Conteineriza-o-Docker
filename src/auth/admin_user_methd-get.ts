import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AdminOrUserGet implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user
        const method = request.method

        if(!user) return false

        if(user.type === 'ADMIN') return true

        if(user.type === 'USER' && method === 'GET') return true

        return false
    }
}