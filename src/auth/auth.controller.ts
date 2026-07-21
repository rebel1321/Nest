import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUserDto';
import { LoginDto } from './dto/loginUserDto';
import { AuthGuard } from './authGuard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  // authService: AuthService;
  // constructor( authService: AuthService) {
  //   this.authService = authService;
  // }
  constructor(private readonly authService: AuthService,private readonly userService: UserService) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    //Logic for user register
    const token = await this.authService.registerUser(registerUserDto);
    return { token };
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // to do:
    /**
     * 1. Recieve email and password
     * 2. Match the email and password
     * 3. Generate JWT Token
     */
    const token = await this.authService.loginUser(loginDto);
    return { token };
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);
    return {
      id: user?._id,
      fname: user?.fname,
      lname: user?.lname,
      email: user?.email,
    }
    // return {
    //   ...user,
    //   password: undefined, // Exclude the password from the response
    // };
    
  }
}
