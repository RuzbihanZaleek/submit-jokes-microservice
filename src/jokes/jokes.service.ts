import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke } from './schemas/joke.schema';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { JOKE_MESSAGES } from 'src/constants';

@Injectable()
export class JokesService {
  constructor(
    @InjectModel(Joke.name) private readonly jokeModel: Model<Joke>,
  ) {}

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    try {
      const existingJoke = await this.jokeModel
        .findOne({ content: createJokeDto.content })
        .exec();
      if (existingJoke) {
        throw new ConflictException(JOKE_MESSAGES.CREATE_CONFLICT);
      }

      const newJoke = new this.jokeModel(createJokeDto);
      return await newJoke.save();
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException(
        `${JOKE_MESSAGES.CREATE_ERROR}: ${error.message}`,
      );
    }
  }

  async findAllTypes(): Promise<string[]> {
    try {
      const types = await this.jokeModel.distinct('type').exec();
      return types;
    } catch (error) {
      throw new InternalServerErrorException(
        `${JOKE_MESSAGES.FETCH_TYPES_ERROR}: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Joke[]> {
    try {
      return await this.jokeModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(
        `${JOKE_MESSAGES.FETCH_ERROR}: ${error.message}`,
      );
    }
  }

  async findById(id: string): Promise<Joke> {
    try {
      const joke = await this.jokeModel.findById(id).exec();
      if (!joke) {
        throw new NotFoundException(JOKE_MESSAGES.NOT_FOUND);
      }
      return joke;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `${JOKE_MESSAGES.FETCH_ERROR}: ${error.message}`,
      );
    }
  }

  async updateJoke(id: string, updateJokeDto: UpdateJokeDto): Promise<Joke> {
    try {
      const updatedJoke = await this.jokeModel
        .findByIdAndUpdate(id, updateJokeDto, { new: true })
        .exec();
      if (!updatedJoke) {
        throw new NotFoundException(JOKE_MESSAGES.NOT_FOUND);
      }
      return updatedJoke;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `${JOKE_MESSAGES.UPDATE_ERROR}: ${error.message}`,
      );
    }
  }

  async deleteJoke(id: string): Promise<{ message: string }> {
    try {
      const deletedJoke = await this.jokeModel.findByIdAndDelete(id);
      if (!deletedJoke) {
        throw new NotFoundException(JOKE_MESSAGES.NOT_FOUND);
      }
      return { message: JOKE_MESSAGES.DELETE_SUCCESS };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`${JOKE_MESSAGES.DELETE_ERROR}: ${error.message}`);
    }
  }
}
