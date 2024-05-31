import UserModel from '../models/usersModel';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';
// const { UserModel } = require('../models/index');
// "MongoDataSource constructor must be given a collection or Mongoose model"
interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  email_verified: boolean;
}

export default class Users extends MongoDataSource<UserDocument> {
  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      console.log(error, 'errrrrrr');
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id: string) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      throw new Error('Failed to retrieve user by ID');
    }
  }

  async getUserByName(name: string) {
    try {
      const getUserByName = await UserModel.findOne({ name });
      return getUserByName;
    } catch (error) {
      throw new Error('Failed to retrieve user by name');
    }
  }

  async getUserByEmail(email: string) {
    try {
      const getUserByName = await UserModel.findOne({ email });
      return getUserByName;
    } catch (error) {
      throw new Error('Failed to retrieve user by name');
    }
  }

  async createUser(input: any) {
    try {
      const newUser = await UserModel.create(input);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async login(_id: any) {
    try {
      const user = await this.getUserById(_id);
      console.log(user, 'userrrr');
      return user;
    } catch (error) {
      throw new Error('Failed to Login');
    }
  }

  // Function to update existing user
  async updateUser({ input }: any) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        input.id,
        { ...input },
        {
          new: true,
        }
      );
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  // Function to delete existing user
  async deleteUser({ id }: { id: string }): Promise<string> {
    try {
      await UserModel.findByIdAndDelete(id);
      return 'User deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}
