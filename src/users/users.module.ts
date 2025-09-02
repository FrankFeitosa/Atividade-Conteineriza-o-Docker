import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersService } from "./users.services";
import { UsersController } from "./users.controller";
import { CursoModule } from "src/curso/curso.module";

@Module({
    imports: [PrismaModule, CursoModule],
    providers: [UsersService],
    controllers: [UsersController]
})

export class UsersModule {}