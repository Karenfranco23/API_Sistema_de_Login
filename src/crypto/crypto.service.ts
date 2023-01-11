import { HttpService } from '@nestjs/axios/dist';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const axios = require('axios');

@Injectable()
export class CryptoService {
  constructor(private readonly httpService: HttpService) { }

  async getAllCryptos() {
    let response = null;
    try {
      response = await axios.get(`${process.env.API_CRYPTO}/crypto`);
    } catch (error) {
      response = null;
      throw new HttpException(`coins not found`, HttpStatus.NOT_FOUND);
    }
    return response ? response.data : null; // verificar se response tem dados, se tiver retorna a data, se não, null
  }

  async getCryptoById(id: string) {
    let response = null;
    try {
      response = await axios.get(`${process.env.API_CRYPTO}/crypto/${id}`);
    } catch (error) {
      response = null;
      throw new HttpException(`coins not found`, HttpStatus.NOT_FOUND);
    }
    return response ? response.data : null;

  }

  async getCryptoPriceById(id: string) {
    let response = null;
    try {
      response = await axios.get(`${process.env.API_CRYPTO}/crypto/${id}/price`);
    } catch (error) {
      response = null;
      throw new HttpException(`coin with uuid ${id} does not exists`, HttpStatus.NOT_FOUND);
    }
    return response ? response.data : null;
  }

  async getCryptoHistoryPriceById(id: string) {
    let response = null;
    try {
      response = await axios.get(`${process.env.API_CRYPTO}/crypto/${id}/history`);
    } catch (error) {
      response = null;
      throw new HttpException(`coin with uuid ${id} does not exists`, HttpStatus.NOT_FOUND);
    }
    return response ? response.data : null;
  }

  async getHistoryOfParameters() {
    const history = await axios.get(`${process.env.API_CRYPTO}/crypto/parameters`);

    if (history.at(0) == null) {
      throw new HttpException(`no history at the moment, get crypto by ID to save to history`, HttpStatus.NOT_FOUND);
    }

    return history;
  }

}
