import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsersDto{
    @ApiProperty({
        example: 'Frank Feitosa',
        description: 'Nome do usuário)'
    })
    @IsNotEmpty({message: 'Nome é obrigatório'})
    @IsString()
    nome: string

    @ApiProperty({
        example: 'desenvolvedorfeitosa@mail.com',
        description: 'E-mail do usuário'
    })
    @IsEmail({}, {message: 'O endereço de e-mail deve ser válido'})
    email: string
    
    @ApiProperty({
        example: '@123547899#',
        description: 'Senha do usuário'
    })
    @IsNotEmpty({message: 'Senha é obrigatória'})
    @IsString()
    password: string
}