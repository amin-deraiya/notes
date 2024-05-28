import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

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
  },

  Mutation: {
    login: async (_: any, { email, pin }: any, context: any) => {
      const cookieStore = cookies();
      try {
        const user = await context.dataSources.users.getUserByEmail(email);

        if (!user) {
          return 'Invalid Input';
        }

        if (pin === user.pin) {
          const jwtSecret: any = process.env.NEXT_PUBLIC_JWT_SECRET;
          const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            status: 'success',
            msg: 'Login Successful',
          };
        } else {
          return {
            status: 'error',
            msg: 'Incorrect email or pin',
          };
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle other potential errors gracefully (e.g., database connection issues)
        throw new Error('Login failed'); // Or a more specific error message
      }
    },
    createUser: async (
      _: any,
      { input }: any,
      context: {
        dataSources: {
          users: {
            createUser: (input: any) => any;
          };
        };
      }
    ) => {
      try {
        const newUser = await context.dataSources.users.createUser({
          _id: new ObjectId(),
          ...input,
        });
        return newUser;
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
  },
};

export default resolvers;
