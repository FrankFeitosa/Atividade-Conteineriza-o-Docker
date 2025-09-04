import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        description: 'Nome do Usuário',
        example: 'Frank Feitosa'
    })
    @IsString()
    nome: string

    @ApiProperty({
        description: 'Email do Usuário',
        example: 'frank@mail.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Senha do Usuário',
        example: 'senha321*'
    })
    @IsString()
    @MinLength(6)
    password: string
}