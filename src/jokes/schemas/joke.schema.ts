import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'jokes' })
export class Joke extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  type: string;
}

export const JokeSchema = SchemaFactory.createForClass(Joke);
