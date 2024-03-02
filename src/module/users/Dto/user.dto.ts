import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsDate } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  min_age?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_age?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @IsDate()
  end_date?: Date;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @IsString()
  sort_field?: string;

  @IsOptional()
  @IsString()
  sort_order?: string;
}
