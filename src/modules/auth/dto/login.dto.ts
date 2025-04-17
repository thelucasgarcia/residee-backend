import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user. Must be a valid email format.',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account. Must be at least 6 characters long.',
    example: '123456',
    minLength: 6,
    required: true
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}