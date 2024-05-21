import { ObjectId } from 'mongodb';
const resolvers = {
  Query: {
    users: async (_: any, __: any, context: { dataSources: { users: { getAllUsers: () => any } } }) => {
      console.log('inside users');

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
      console.log(email, pin, "sdlfjasdlkfj");
      
      try {
        const user = await context.dataSources.users.getUserByEmail(email);
    
        if (!user) {
          return "Invalid Input";
        }
    
        if (pin === user.pin) {
          return {
            _id: user.id,
            name: user.name,
            email: user.email,
            status: "success"
          };
        } else {
          return "Incorrect Pin";
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Handle other potential errors gracefully (e.g., database connection issues)
        throw new Error("Login failed"); // Or a more specific error message
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
  },
};

export default resolvers;