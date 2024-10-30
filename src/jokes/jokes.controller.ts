import { Controller, Post, Get, Body } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';

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
}
