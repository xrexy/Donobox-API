import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User {
  @Field()
  userId: string;

  @Field()
  @Prop({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  password?: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
