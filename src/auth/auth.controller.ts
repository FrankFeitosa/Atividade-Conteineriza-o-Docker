import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.dto";
import { GoogleService } from "./google-auth.service";
import { ApiBody, ApiConflictResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private googleService: GoogleService
    ) { }

    @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiCreatedResponse({
        description: 'Usuário registrado com sucesso!'
    })
    @ApiConflictResponse({
        description: 'Email já em uso'
    })
    async registerUser(@Body() userData: RegisterDto) {
        return this.authService.userRegister(userData)
    }

    @Post('login')
    @ApiBody({type: LoginDto})
    async login(@Body() credentials: LoginDto): Promise<LoginResponseDto>{
        return this.authService.login(credentials)
    }

    @Post('google')
    @ApiBody({
        description: 'Google ID Token',
        schema: {
            type: 'object',
            properties: {
                idToken: { type: 'string' }
            }
        }
    })
    async loginWithGoogle(@Body() body: { IdToken: string }) {
        const access_token = await this.googleService.verify(body.IdToken)
        return { access_token }
    }


}