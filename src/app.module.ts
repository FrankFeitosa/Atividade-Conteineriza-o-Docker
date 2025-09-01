import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursoService } from './curso/curso.service';
import { CursoController } from './curso/curso.controller';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [CursoModule],
  controllers: [AppController, CursoController],
  providers: [AppService, CursoService],
})
export class AppModule {}
