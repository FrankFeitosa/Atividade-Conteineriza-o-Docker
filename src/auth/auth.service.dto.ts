import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt'
import { LoginDto } from "./dto/login.dto";
import { JwtService } from '@nestjs/jwt'
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService
    ) { }

    async userRegister(userData: RegisterDto) {
        const userReal = await this.prisma.user.findUnique(
            { where: { email: userData.email } }
        )

        if (userReal) {
            throw new ConflictException('Email já existe no sistema!')
        }

        const hasedPassword = await bcrypt.hash(userData.password, 10)

        const newUser = await this.prisma.user.create({
            data: {
                nome: userData.nome,
                email: userData.email,
                password: userData.password
            },
            select: {
                id: true,
                nome: true,
                email: true,
                type: true
            }
        })

        return newUser
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } })

        if (!user) throw new UnauthorizedException('Credenciais Inválidas!')

        if (!user.password) throw new UnauthorizedException('Usuário não possuí senha deffinida (Logar com o Google)')

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) throw new UnauthorizedException('Credenciais Inválidas!')

        return user
    }

    async login(credentials: LoginDto){
        const user = await this.validateUser(credentials.email, credentials.password)
        
        const payload = {
            userId: user.id,
            email: user.email,
            type: user.type
        }

        return { access_token: this.jwt.sign(payload)}
    }
    
    async findOrCreateGoogleUser({googleID, email, nome, password}){
        let user = await this.prisma.user.findUnique({where: {googleID}})
        if(!user){
            user = await this.prisma.user.create({
                data: {
                    nome,
                    email,
                    password,
                    googleID
                }
            })
        }
        return user
    }

    singJwtForUser(user: User){
        const payload = {
            sub: user.id,
            email: user.email,
            type: user.type
        }

        return this.jwt.sign(payload)
    }
}