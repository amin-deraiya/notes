import { startServerAndCreateNextHandler } from '@as-integrations/next';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';
import typeDefs from './schema';
import resolvers from './resolvers';
import Users from './datasources';
import { ApolloServer } from '@apollo/server';
import express from 'express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import UserModel from './models/usersModel';
import notesModel from './models/notesModel';
import Notes from './datasources/notesSource';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const app = express();
const httpServer = http.createServer(app);

interface MyContext {
  token?: String;
}

const connectDB = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log('🎉 connected to database successfully');
    }
  } catch (error) {
    console.error(error);
  }
};
connectDB();

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: any, res: any) => {
    return {
      req,
      res,
      dataSources: {
        users: new Users({ modelOrCollection: UserModel }),
        notes: new Notes({ modelOrCollection: notesModel }),
      },
    };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
