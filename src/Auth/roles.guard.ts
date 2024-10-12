import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.enum";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
        if (!roles) {
            return true;
        }
        const hasRole = roles.some(role => user?.role?.includes(role));
        const valid = user && user.role && hasRole;
        if (!valid) {
            throw new ForbiddenException( 'You are not authorized to access this resource' )
        }
        return true;
    }
    
    
}