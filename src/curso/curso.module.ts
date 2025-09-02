import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';

@Module({
    imports: [PrismaModule],
    providers: [CursoService],
    exports: [CursoController]
})
export class CursoModule {}
