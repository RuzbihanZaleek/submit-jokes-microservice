import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JOKE_MESSAGES } from 'src/constants';

@ApiTags('submit-jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  @ApiOperation({ summary: 'Create submit jokes' })
  @ApiResponse({ status: 201, description: JOKE_MESSAGES.CREATE_SUCCESS })
  @ApiResponse({ status: 409, description: JOKE_MESSAGES.CREATE_CONFLICT })
  @ApiResponse({ status: 500, description: JOKE_MESSAGES.CREATE_ERROR })
  async create(@Body() createJokeDto: CreateJokeDto) {
    return this.jokesService.create(createJokeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submit jokes' })
  @ApiResponse({
    status: 200,
    description: JOKE_MESSAGES.FETCH_SUCCESS,
  })
  @ApiResponse({ status: 500, description: JOKE_MESSAGES.FETCH_ERROR })
  async findAll() {
    return this.jokesService.findAll();
  }

  @Get('types')
  @ApiOperation({ summary: 'Get jokes types' })
  @ApiResponse({ status: 200, description: JOKE_MESSAGES.FETCH_TYPES_SUCCESS })
  @ApiResponse({ status: 500, description: JOKE_MESSAGES.FETCH_TYPES_ERROR })
  async findAllTypes() {
    return this.jokesService.findAllTypes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get joke by id' })
  @ApiResponse({ status: 200, description: JOKE_MESSAGES.FETCH_SUCCESS })
  @ApiResponse({ status: 404, description: JOKE_MESSAGES.NOT_FOUND })
  @ApiResponse({ status: 500, description: JOKE_MESSAGES.FETCH_ERROR })
  async findOne(@Param('id') id: string) {
    return this.jokesService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update jokes' })
  @ApiResponse({ status: 200, description: JOKE_MESSAGES.UPDATE_SUCCESS })
  @ApiResponse({ status: 404, description: JOKE_MESSAGES.NOT_FOUND })
  @ApiResponse({ status: 500, description: JOKE_MESSAGES.UPDATE_ERROR })
  async updateJoke(
    @Param('id') id: string,
    @Body() updateJokeDto: UpdateJokeDto,
  ) {
    return this.jokesService.updateJoke(id, updateJokeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a joke' })
  @ApiResponse({ status: 200, description: JOKE_MESSAGES.DELETE_SUCCESS })
  @ApiResponse({ status: 404, description: JOKE_MESSAGES.NOT_FOUND })
  @ApiResponse({ status: 500, description: JOKE_MESSAGES.DELETE_ERROR })
  async deleteJoke(@Param('id') id: string) {
    return await this.jokesService.deleteJoke(id);
  }
}
