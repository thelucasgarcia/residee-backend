import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address of the user. Must be a valid email format.',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account. Must be at least 6 characters long.',
    example: 'securePassword123',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}