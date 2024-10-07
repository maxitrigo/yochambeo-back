import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if(!authHeader) {
            
            throw new UnauthorizedException('No se proporciono el token de autenticación');
        }

        const token = authHeader.split(' ')[1];

        

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.auth
        } catch (error) {
            throw new UnauthorizedException('Token de autenticación inválido');
        }
    }
    
}