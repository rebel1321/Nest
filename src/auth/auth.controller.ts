import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUserDto';
import { LoginDto } from './dto/loginUserDto';

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
  @Post('login')
async login(@Body() loginDto: LoginDto){
  // to do:
  /**
   * 1. Recieve email and password 
   * 2. Match the email and password
   * 3. Generate JWT Token
   */
  const token = await this.authService.loginUser(loginDto);
  return { token };
}
}

