import { MongoDataSource } from 'apollo-datasource-mongodb';
import notesModel from '../models/notesModel';
import { encode } from '@/app/lib/decodeText';

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
      const clonedNote = { ...input };

      clonedNote.title = encode(clonedNote?.title);
      clonedNote.description = encode(clonedNote.description);

      const newNote = await notesModel.create(clonedNote);
      return newNote;
    } catch (error) {
      throw new Error('Failed to create Note in datasource');
    }
  }

  async updateNote(input: any) {
    try {
      const filter = { _id: input._id };

      input.title = encode(input.title);
      input.description = encode(input.description);

      let doc = await notesModel.findOneAndUpdate(filter, input);

      return doc;
    } catch (error) {
      throw new Error('Failed to Update Note in datasource');
    }
  }

  async deleteNote(_id: string) {
    try {
      let doc = await notesModel.deleteOne({ _id });
      return doc;
    } catch (error) {
      throw new Error('Failed to Delete Note in datasource');
    }
  }

  async getAllNotes(userId: string) {
    try {
      let allNotes = await notesModel.find({ userId });
      return allNotes;
    } catch (error) {
      throw new Error('Failed to retrieve Notes');
    }
  }
}
