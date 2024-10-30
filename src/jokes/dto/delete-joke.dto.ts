import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteJokeDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
