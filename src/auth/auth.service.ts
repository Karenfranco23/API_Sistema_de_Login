import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginTokenDto } from './dto/login-token.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserPayloadDto } from './dto/login-user-payload.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(email: string, password: string): Promise<LoginTokenDto> {

        const user = await this.validateUser(email, password);
        if (!user) throw new NotFoundException('Invalid username or password');

        const payload: LoginUserPayloadDto = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        }
    }

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.userService.findByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }
}
