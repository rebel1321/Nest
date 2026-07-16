import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUserDto';
import { User } from './schemas/userSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongoServerError } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error) {
      const DUPLICATE_KEY_ERROR_CODE = 11000;
      if (
        error instanceof MongoServerError &&
        error.code === DUPLICATE_KEY_ERROR_CODE
      ) {
        const [field, value] = Object.entries(error.keyValue)[0];

        throw new ConflictException(`${field} '${value}' already exists`);
      }
      throw error;
    }
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
