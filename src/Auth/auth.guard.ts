import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;


        if(!authHeader) {
            throw new UnauthorizedException('No se proporciono el token de autenticación');
        }

        const Bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];

        if(Bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid token');
        }

        try {
            const secret = process.env.JWT_SECRET

            function removeQuotes(token) {
                return token.replace(/['"]/g, '');
            }

            const newToken = removeQuotes(token);


            const decoded = jwt.verify(newToken, secret);

            request.user = decoded;
            
            return true


        } catch (error) {
            throw new UnauthorizedException('Token de autenticación inválido');
        }
    }
    
}