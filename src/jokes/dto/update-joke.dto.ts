import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateJokeDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsBoolean()
  moderated?: boolean;

  @IsOptional()
  @IsBoolean()
  addedToDeliver?: boolean;
}
