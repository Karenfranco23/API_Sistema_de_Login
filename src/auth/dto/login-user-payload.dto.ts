export class LoginUserPayloadDto {
    sub: number;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
    role: string;
}