import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { decode } from '@/app/lib/decodeText';

const resolvers = {
  Query: {
    users: async (_: any, __: any, context: any) => {
      try {
        return await context.dataSources.users.getAllUsers();
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
    user: async (
      _: any,
      { id }: { id: string },
      context: { dataSources: { users: { getUserById: (id: string) => any } } }
    ) => {
      try {
        return await context.dataSources.users.getUserById(id);
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },
    getUserByName: async (
      _: any,
      { name }: { name: string },
      context: { dataSources: { users: { getUserByName: (name: string) => any } } }
    ) => {
      try {
        return await context.dataSources.users.getUserByName(name);
      } catch (error) {
        throw new Error('Failed to fetch user by name');
      }
    },
    getUserByEmail: async (
      _: any,
      { email }: { email: string },
      context: { dataSources: { users: { getUserByEmail: (email: string) => any } } }
    ) => {
      try {
        return await context.dataSources.users.getUserByEmail(email);
      } catch (error) {
        throw new Error('Failed to fetch user by Email');
      }
    },
    getAllNotes: async (
      _: any,
      { userId }: any,
      context: { dataSources: { notes: { getAllNotes: (userId: string) => any } } }
    ) => {
      try {
        const notes = await context.dataSources.notes.getAllNotes(userId);
        notes.forEach((item: any) => {
          try {
            item.title = decode(item?.title || '');
            item.description = decode(item?.description || '');
          } catch (error) {
            console.error(`Error decoding item ${item.id}:`);
          }
        });
        return notes;
      } catch (error: any) {
        throw new Error('Failed to Retrive All Notes', error);
      }
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { email, name, email_verified }: any,
      context: {
        dataSources: {
          users: any;
        };
      }
    ) => {
      try {
        const isUserAlreadyExist = await context.dataSources.users.getUserByEmail(email);
        if (isUserAlreadyExist?._id) {
          return;
        } else {
          const newUser = await context.dataSources.users.createUser({
            _id: new ObjectId(),
            email,
            email_verified,
            name,
          });
          return newUser;
        }
      } catch (error: any) {
        throw new Error('Failed to create user');
      }
    },
    updateUser: async (_: any, { input }: any, context: any) => {
      try {
        return await context.dataSources.users.updateUser({ input });
      } catch (error) {
        throw new Error('Failed to update user');
      }
    },
    deleteUser: async (_: any, { id }: any, context: any) => {
      try {
        return await context.dataSources.users.deleteUser({ id });
      } catch (error) {
        throw new Error('Failed to delete user');
      }
    },

    createNote: async (
      _: any,
      { _id, userId, title, description, hidden, password }: any,
      context: {
        dataSources: {
          notes: any;
        };
      }
    ) => {
      const payload = {
        _id,
        title,
        userId,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        password,
        hidden,
      };

      try {
        const newNote = await context.dataSources.notes.createNote(payload);
        return newNote;
      } catch (error) {
        throw new Error('Failed to create Note');
      }
    },
    updateNote: async (
      _: any,
      { _id, title, description, hidden, password }: any,
      context: {
        dataSources: {
          notes: any;
        };
      }
    ) => {
      const payload = {
        _id,
        title,
        description,
        updatedAt: new Date(),
        password,
        hidden: hidden || false,
      };

      try {
        const newNote = await context.dataSources.notes.updateNote(payload);
        return newNote;
      } catch (error) {
        throw new Error('Failed to create Note');
      }
    },
    deleteNote: async (_: any, { _id }: any, context: any) => {
      try {
        const dlt = await context.dataSources.notes.deleteNote({ _id });
        return dlt
      } catch (error) {
        throw new Error('Failed to delete user');
      }
    },
  },
};

export default resolvers;
