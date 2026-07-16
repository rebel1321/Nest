import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUserDto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUserDto';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(registerUserDto: RegisterDto) {
    const hash = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userService.createUser({...registerUserDto, password: hash });
    const payload = { sub: user._id };
    const token = await this.jwtService.signAsync(payload);
    return  {accessToken: token};
  }
  async loginUser(loginDto: LoginDto){
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new Error('Invalid email');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({ sub: user._id });
    return { accessToken: token };
  }
}

