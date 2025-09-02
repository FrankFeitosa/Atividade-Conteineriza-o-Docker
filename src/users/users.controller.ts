import { Controller, Get, Put, Delete, Param, Body} from "@nestjs/common";
import { UsersService } from "./users.services";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateUsersDto } from "./dto/update.users.dto";
@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    @ApiOperation({summary: 'Lista todos os usuários'})
    @ApiResponse({status: 200, description: 'Lista de Usuários'})
    async usersFindAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Lista usuários por ID'})
    @ApiResponse({status: 200, description: 'Lista os usuários pelo ID'})
    async usersFindId(id: number){
        return this.usersService.findOne(id)
    }

    @Put(':id')
    @ApiOperation({summary: 'Atualiza usuários por ID'})
    @ApiResponse({status: 200, description: 'Usuário atualizado com sucesso!'})
    @ApiResponse({status: 404, description: 'Usuário não encontrado'})
    async usersUpdate(@Param('id') id: number, @Body() data: UpdateUsersDto){
        return this.usersService.update(id, data)
    }
    
    @Delete(':id')
    @ApiOperation({summary: 'Remove usuários por ID'})
    @ApiResponse({status: 200, description: 'Usuário deletado!'})
    async usersDelete(@Param('id') id: number){
        return this.usersService.remove(id)
    }    
}