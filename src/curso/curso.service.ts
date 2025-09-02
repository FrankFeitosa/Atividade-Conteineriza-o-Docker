import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Curso, Prisma } from '@prisma/client'

@Injectable()
export class CursoService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.CursoCreateInput): Promise<Curso> {
        return this.prisma.curso.create({ data })
    }

    async findAll(): Promise<Curso[]> {
        return this.prisma.curso.findMany()
    }

    async findOne(id: number): Promise<Curso | null> {
        return this.prisma.curso.findUnique({
            where: {id}
        })
    }

    async update(id: number, data: Prisma.CursoUpdateInput): Promise<Curso | null> {
        const foundId = await this.prisma.curso.findUnique({ where: { id } })
        if (!foundId) {
            throw new NotFoundException(`Curso com o ID ${id} não encontrado`)
        }
        return await this.prisma.curso.update({ where: { id }, data })
    }

    async remove(id: number): Promise<Curso | null> {
        try {
            return await this.prisma.curso.delete({ where: { id } })
        } catch {
            throw new NotFoundException(`
                Curso com o ID ${id} não encontrado
                `)
        }
    }
}
