import { MongoDataSource } from 'apollo-datasource-mongodb';
import notesModel from '../models/notesModel';

interface NOTES {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
  hidden: boolean;
  userId: string;
}

export default class Notes extends MongoDataSource<NOTES> {
  async createNote(input: any) {
    try {
      const newUser = await notesModel.create(input);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create Note in datasource');
    }
  }

  async getAllNotes() {
    try {
      return await notesModel.find();
    } catch (error) {
      throw new Error('Failed to retrieve Notes');
    }
  }
}
