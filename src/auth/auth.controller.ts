import { Controller, Body, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post()
    @ApiOperation({ summary: "Authentication" })
    @HttpCode(HttpStatus.ACCEPTED)
    async login(@Res() res, @Body() login: LoginDto) {
        try {
            const result = await this.authService.login(login.email, login.password);
            res.status(HttpStatus.ACCEPTED).json(result);
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    }
}
