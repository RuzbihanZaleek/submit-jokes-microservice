import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJokeDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
