import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneDto {
  @ApiProperty({
    description: 'Unique identifier of the user in UUID format.',
    example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
  })
  @IsUUID('4', { message: 'The ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'The ID cannot be empty.' })
  id: string;
}