import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Head, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CryptoService } from './crypto.service';

@ApiBearerAuth()
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  @ApiOperation({ summary: "Get all cryptos" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  async getAllCryptos() {
    return await this.cryptoService.getAllCryptos();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get crypto by id" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  async getCryptoById(@Param("id") id: string) {
    return await this.cryptoService.getCryptoById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(":id/price")
  @ApiOperation({ summary: "Get crypto price in USD by id" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  async getCryptoPriceById(@Param("id") id: string) {
    return await this.cryptoService.getCryptoPriceById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(":id/history")
  @ApiOperation({ summary: "Get crypto price history in USD" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  async getCryptoHistoryPriceById(@Param("id") id: string) {
    return await this.cryptoService.getCryptoHistoryPriceById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get("/parameters")
  @ApiOperation({ summary: "History of accessed parameters" })
  @ApiResponse({ status: 200, description: "ok" })
  @ApiResponse({ status: 404, description: "Not Found" })
  async getHistoryOfParameters() {
    return await this.cryptoService.getHistoryOfParameters();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Head()
  @ApiOperation({ summary: "Get headers" })
  @ApiResponse({ status: 200, description: "ok" })
  async getHeader() {
    return (await this.cryptoService.getAllCryptos()).map(c => new CryptoService(c));
  }
}
