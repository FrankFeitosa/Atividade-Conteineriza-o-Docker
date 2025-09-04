import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { SalaModule } from './sala/sala.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CursoModule, SalaModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
