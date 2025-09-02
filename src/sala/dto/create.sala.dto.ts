import { ApiProperty } from "@nestjs/swagger";
import { Professores, turmaSala, turnoSala } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateSalaDto{
    @ApiProperty({
        example: 'A tecnologia através dos tempos',
        description: 'Aula de Ciências da Computação'
    })
    @IsNotEmpty({message: 'Nome do conteúdo é obrigatório'})
    conteudo: string

    @ApiProperty({
        example: 'Jonas Fortes',
        description: 'Professor das áreas de Especialização em Backend e FrontEnd'
    })
    @IsEnum(Professores)
    professor: Professores
    
    @ApiProperty({
        example: 'Turma 2025.1',
        description: 'Turma iniciada no primeiro semestre.'
    })
    @IsEnum(turmaSala)
    turma: turmaSala

    @ApiProperty({
        example: 'Turno Noite',
        description: 'Horário das 18hs às 22hs'
    })
    @IsEnum(turnoSala)
    turno: turnoSala
}