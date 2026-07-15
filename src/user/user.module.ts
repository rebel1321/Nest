import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/userSchema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
