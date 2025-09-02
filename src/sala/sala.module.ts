import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SalaService } from './sala.services';
import { SalaController } from './sala.controller';

@Module({
    imports: [PrismaModule],
    providers: [SalaService],
    exports: [SalaController]
})
export class SalaModule {}
