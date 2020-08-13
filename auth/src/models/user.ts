import mongoose from 'mongoose';
import { Password } from '../services/password';

// Interface that describes the properties that are required to create a new User.
interface UserAttr {
  email: string;
  password: string;
}

//Interface that describes the properties that user Model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttr): UserDoc;
}

//Interface that describes the properies that User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hased = await Password.toHash(this.get('password'));
    this.set('password', hased);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
