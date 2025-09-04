import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service.dto";
import { PrismaService } from "../prisma/prisma.service";
import { GoogleService } from "./google-auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.register(
            {
                secret: 'meu-segredo',
                signOptions: {expiresIn: '1d'}
            }
        )
    ],
    providers: [AuthService, PrismaService, JwtStrategy,GoogleService],
    controllers: [AuthController]
})
export class AuthModule {}