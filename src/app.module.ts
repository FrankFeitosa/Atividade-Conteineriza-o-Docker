import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { SalaModule } from './sala/sala.module';

@Module({
  imports: [CursoModule, SalaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
