import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    const userWithThisEmailExits = await this.prisma.user.findUnique({ where: { email } });

    if (!userWithThisEmailExits) {
      throw new HttpException(`User with e-mail ${email} does not exists!`, HttpStatus.NOT_FOUND);
    }

    return userWithThisEmailExits;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {

    const userExits = await this.prisma.user.findUnique({ where: { id, } })

    if (!userExits) {
      throw new HttpException(`User with id ${id} does not exists!`, HttpStatus.NOT_FOUND);
    }

    return userExits;

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { id, } })
    if (!userExists) {
      throw new HttpException(`User with id ${id} not found!`, HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        password: updateUserDto.password,
        name: updateUserDto.name,
        role: updateUserDto.role
      }
    });
  }

  async remove(id: number) {
    const idExists = await this.prisma.user.findUnique({ where: { id, } })
    if (!idExists) {
      throw new HttpException(`User with id ${id} not found!`, HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.delete({ where: { id } });
  }
}
