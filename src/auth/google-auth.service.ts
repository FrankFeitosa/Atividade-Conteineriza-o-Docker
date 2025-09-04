import { Injectable, UnauthorizedException } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { AuthService } from "./auth.service.dto";

@Injectable()
export class GoogleService{
    private client: OAuth2Client;

    constructor(private authService: AuthService){
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    }

    async verify(idToken: string){
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        if(!payload) throw new UnauthorizedException('Token inválido!')
        
        const {sub, email, name} = payload

        const user = await this.authService.findOrCreateGoogleUser({
            googleID: sub,
            email,
            nome: name,
            password: ''
        })

        return this.authService.singJwtForUser(user)
    }

}