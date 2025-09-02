import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { SalaModule } from './sala/sala.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CursoModule, SalaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
