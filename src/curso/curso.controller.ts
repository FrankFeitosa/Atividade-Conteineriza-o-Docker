import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create.curso.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateCursoDto } from './dto/update.curso.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AdminOrUserGet } from '../auth/admin_user_methd-get';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/curso')
export class CursoController {
    private cursoService: CursoService

    constructor(cursoService: CursoService) {
        this.cursoService = cursoService
    }

    @UseGuards(AdminGuard)
    @Post('criar')
    @ApiOperation({ summary: 'Cria um novo curso' })
    @ApiResponse({ status: 201, description: 'Curso criado com Sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async createCurso(@Body() data: CreateCursoDto) {
        return this.cursoService.create(data)
    }

    @UseGuards(AdminOrUserGet)
    @Get()
    @ApiOperation({ summary: 'Lista todos os cursos' })
    @ApiResponse({ status: 200, description: 'Lista de Cursos' })
    async findAllCursos() {
        return this.cursoService.findAll()
    }


    @UseGuards(AdminOrUserGet)
    @Get(':id')
    @ApiOperation({ summary: 'Busca o curso por ID' })
    @ApiResponse({ status: 200, description: 'Curso encontrado' })
    @ApiResponse({ status: 404, description: 'Curso Não encontrado' })
    async findOneCurso(@Param('id') id: number) {
        return this.cursoService.findOne(id)
    }

    @UseGuards(AdminGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Atualiza curso por ID' })
    @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Curso não encontrado' })
    async updateCurso(@Param('id') id: number, @Body() data: UpdateCursoDto) {
        return this.cursoService.update(id, data)
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Deleta um curso pelo ID' })
    @ApiResponse({ status: 200, description: 'Curso Removido com Sucesso!' })
    async remoeCurso(@Param('id') id: number) {
        return this.cursoService.remove(id)
    }
}
