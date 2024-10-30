import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke } from './schemas/joke.schema';
import { CreateJokeDto } from './dto/create-joke.dto';

@Injectable()
export class JokesService {
  constructor(
    @InjectModel(Joke.name) private readonly jokeModel: Model<Joke>,
  ) {}

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    try {
      const newJoke = new this.jokeModel(createJokeDto);
      return await newJoke.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating joke: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Joke[]> {
    try {
      return await this.jokeModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving jokes: ${error.message}`,
      );
    }
  }

  async deleteJoke(id: string): Promise<{ message: string }> {
    try {
      const deletedJoke = await this.jokeModel.findByIdAndDelete(id);
      if (!deletedJoke) {
        throw new NotFoundException(`Joke not found`);
      }
      return { message: 'Joke deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting joke: ${error.message}`);
    }
  }
}
