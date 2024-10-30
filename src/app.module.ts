import { Module } from '@nestjs/common';
import { JokesModule } from './jokes/jokes.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), JokesModule],
})
export class AppModule {}
