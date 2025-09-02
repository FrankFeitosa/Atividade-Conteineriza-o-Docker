import { ApiProperty } from "@nestjs/swagger";
import { categoriaCurso, nivelCurso } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateCursoDto{
    @ApiProperty({
        example: 'Introdução ao Desenvolvimento Web',
        description: 'Nome do curso escolhido, ex.:(Sistema Operacional Linux, NestJs...)'
    })
    @IsNotEmpty({message: 'Nome do curso é obrigatório'})
    nome: string

    @ApiProperty({
        example: 'FULLSTACK',
        description: 'Categoria do Curso, ex.:(Especialização em BackEnd, ADS...)'
    })
    @IsEnum(categoriaCurso)
    categoria: categoriaCurso
    
    @ApiProperty({
        example: 'Avançado',
        description: 'Nível do Curso, ex:(Básico, Intermediário)'
    })
    @IsEnum(nivelCurso)
    nivel: nivelCurso
}