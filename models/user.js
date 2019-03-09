/* eslint-disable prefer-destructuring */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  this.password = hash;
};

UserSchema.methods.generateWebToken = function generateWebToken() {
  return jwt.sign(
    {
      email: this.email,
    },
    'secret',
  );
};

UserSchema.methods.toAuthToken = function toAuthToken() {
  return {
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    token: this.generateWebToken(),
    loggedIn: 'success',
  };
};

export default mongoose.model('user', UserSchema);
