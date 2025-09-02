import { Body, Controller, Post, Get, Param, Put, Delete} from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create.curso.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateCursoDto } from './dto/update.curso.dto';


@Controller('/curso')
export class CursoController {
    private cursoService: CursoService

    constructor(cursoService: CursoService){
        this.cursoService = cursoService
    }

    @Post('criar')
    @ApiOperation({summary: 'Cria um novo curso'})
    @ApiResponse({status: 201, description: 'Curso criado com Sucesso'})
    @ApiResponse({status: 400, description: 'Dados inválidos'})
    async createCurso(@Body() data: CreateCursoDto){
        return this.cursoService.create(data)
    }

    @Get()
    @ApiOperation({summary: 'Lista todos os cursos'})
    @ApiResponse({status: 200, description: 'Lista de Cursos'})
    async findAllCursos(){
        return this.cursoService.findAll()
    }

    @Get(':id')
    @ApiOperation({summary: 'Busca o curso por ID'})
    @ApiResponse({status: 200, description: 'Curso encontrado'})
    @ApiResponse({status: 404, description: 'Curso Não encontrado'})
    async findOneCurso(@Param('id') id: number){
        return this.cursoService.findOne(id)
    }

    @Put(':id')
    @ApiOperation({summary: 'Atualiza curso por ID'})
    @ApiResponse({status: 200, description: 'Curso atualizado com sucesso'})
    @ApiResponse({status: 404, description: 'Curso não encontrado'})
    async updateCurso(@Param('id') id: number, @Body() data: UpdateCursoDto) {
        return this.cursoService.update(id, data)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deleta um curso pelo ID'})
    @ApiResponse({status: 200, description: 'Curso Removido com Sucesso!'})
    async remoeCurso(@Param('id') id: number){
        return this.cursoService.remove(id)
    }
}
