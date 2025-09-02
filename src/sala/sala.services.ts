import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Sala, Prisma } from '@prisma/client'

@Injectable()
export class SalaService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.SalaCreateInput): Promise<Sala> {
        return this.prisma.sala.create({ data })
    }

    async findAll(): Promise<Sala[]> {
        return this.prisma.sala.findMany()
    }

    async findOne(id: number): Promise<Sala | null> {
        return this.prisma.sala.findUnique({
            where: {id}
        })
    }

    async update(id: number, data: Prisma.SalaUpdateInput): Promise<Sala | null> {
        const foundId = await this.prisma.sala.findUnique({ where: { id } })
        if (!foundId) {
            throw new NotFoundException(`Sala com o Identificador nº ${id} não encontrado`)
        }
        return await this.prisma.sala.update({ where: { id }, data })
    }

    async remove(id: number): Promise<Sala | null> {
        try {
            return await this.prisma.sala.delete({ where: { id } })
        } catch {
            throw new NotFoundException(`
                Sala com o Identificador nº ${id} não encontrado
                `)
        }
    }
}
