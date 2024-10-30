import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { DeleteJokeDto } from './dto/delete-joke.dto';

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

  @Delete(':id')
  async deleteJoke(@Param() params: DeleteJokeDto) {
    return this.jokesService.deleteJoke(params.id);
  }
}
