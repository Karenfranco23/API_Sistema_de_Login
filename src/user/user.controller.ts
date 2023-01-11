import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger/dist';

@ApiBearerAuth()
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @ApiOperation({ summary: "Create user (ADMIN)" })
  @ApiResponse({ status: 201, description: "Created" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  @ApiOperation({ summary: "Find all users" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  findAll() {
    return this.userService.findAll();
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @ApiOperation({ summary: "Find user by ID (ADMIN)" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Update user (ADMIN)" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Delete user (ADMIN)" })
  @ApiResponse({ status: 204, description: "No content" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
