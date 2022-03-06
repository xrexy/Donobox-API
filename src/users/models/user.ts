import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
// @Schema()
export class User {
  @Field()
  userId: string;

  @Field()
  // @Prop()
  email: string;

  @Field(() => Int)
  // @Prop()
  age: number;
  
  @Field({ nullable: true })
  // @Prop()
  isSubscribed?: boolean;
  
  @Field({ nullable: true })
  // @Prop()
  password?: string;
}
