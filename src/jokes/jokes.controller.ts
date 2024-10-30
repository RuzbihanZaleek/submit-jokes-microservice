import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  async create(@Body() createJokeDto: CreateJokeDto) {
    return this.jokesService.create(createJokeDto);
  }

  @Get()
  async findAll() {
    return this.jokesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jokesService.findById(id);
  }

  @Get('types')
  async findAllTypes() {
    return this.jokesService.findAllTypes();
  }

  @Put(':id')
  async updateJoke(
    @Param('id') id: string,
    @Body() updateJokeDto: UpdateJokeDto,
  ) {
    return this.jokesService.updateJoke(id, updateJokeDto);
  }

  @Delete(':id')
  async deleteJoke(@Param('id') id: string) {
    try {
      return await this.jokesService.deleteJoke(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
