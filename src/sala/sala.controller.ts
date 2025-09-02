import { Body, Controller, Post, Get, Param, Put, Delete} from '@nestjs/common';
import { SalaService } from './sala.services';
import { CreateSalaDto } from './dto/create.sala.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateSalaDto } from './dto/update.sala.dto';


@Controller('/sala')
export class SalaController {
    private salaService: SalaService

    constructor(salaService: SalaService){
        this.salaService = salaService
    }

    @Post('criar')
    @ApiOperation({summary: 'Cria uma nova sala'})
    @ApiResponse({status: 201, description: 'Sala criada com Sucesso'})
    @ApiResponse({status: 400, description: 'Dados inválidos'})
    async createCurso(@Body() data: CreateSalaDto){
        return this.salaService.create(data)
    }

    @Get()
    @ApiOperation({summary: 'Lista todas as salas'})
    @ApiResponse({status: 200, description: 'Lista das Salas'})
    async findAllCursos(){
        return this.salaService.findAll()
    }

    @Get(':id')
    @ApiOperation({summary: 'Busca a sala por ID'})
    @ApiResponse({status: 200, description: 'Sala encontrada'})
    @ApiResponse({status: 404, description: 'Sala Não encontrada'})
    async findOneCurso(@Param('id') id: number){
        return this.salaService.findOne(id)
    }

    @Put(':id')
    @ApiOperation({summary: 'Atualiza a sala por ID'})
    @ApiResponse({status: 200, description: 'Sala atualizada com sucesso'})
    @ApiResponse({status: 404, description: 'Sala não encontrada'})
    async updateCurso(@Param('id') id: number, @Body() data: UpdateSalaDto) {
        return this.salaService.update(id, data)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deleta uma sala pelo ID'})
    @ApiResponse({status: 200, description: 'Sala removida com Sucesso!'})
    async remoeCurso(@Param('id') id: number){
        return this.salaService.remove(id)
    }
}
