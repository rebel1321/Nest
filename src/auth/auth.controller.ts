import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUserDto';

@Controller('auth')
export class AuthController {
  // authService: AuthService;
  // constructor( authService: AuthService) {
  //   this.authService = authService;
  // }
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerUserDto:RegisterDto){
    //Logic for user register 
    const token= await this.authService.registerUser(registerUserDto);
    return { token };
  }
}
