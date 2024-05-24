import { startServerAndCreateNextHandler } from '@as-integrations/next';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import typeDefs from './schema';
import resolvers from './resolvers';
import Users from './datasources';
// import UserModel from './models';
// import {User,Session} from './models'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
const session = require('express-session');
// const { UserModal, SessionModal } = require('./models');
import UserModel from './models/usersModel';
import SessionModel from './models/sessionModel';
import { RequestHandler } from '@apollo/client';
import { cookies } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next';
import Sessions from './datasources/sessionSource';

const uri = 'mongodb+srv://aminwork192:bHf7ABAOA3AgJwhe@cluster0.w6tm9v0.mongodb.net/notes-db';
const port = process.env.PORT || 4000;
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

// const server: any = new ApolloServer({
//   resolvers,
//   typeDefs,
// });
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const sess = {
  secret: 'keyboard cat',
  cookie: {},
};

app.use(session(sess));

console.log(session());

type MyRequestType = NextRequest | NextApiRequest | NextApiResponse;

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: any , res: any) => {
    const session_id = cookies()?.get('session_id')?.value;
    // console.log(session_id, "session_id");
    const userSession = await SessionModel.findOne({ sessionId: session_id })
      .where('expireAt')
      .gt(new Date()); // Check expiration time

    // if (session_id && !userSession) {
    //   const cookieStore = cookies();
    //   cookieStore.set('session_id', '', {
    //     httpOnly: true,
    //     path: '/',
    //     secure: true,
    //     expires: new Date(),
    //   });

    //   throw (new Error('Session expired. Please log in again.').name = 'Unauthorized or Session Expired');
    // }

    return {
      req,
      res,
      session_id,
      dataSources: {
        users: new Users({ modelOrCollection: UserModel }),
        sessions: new Sessions({modelOrCollection: SessionModel})
        // session: new Sessions({modelOrCollection: SessionModel})
      },
    };
  },
  // context: async (req, res) => ({
  //   req,
  //   res,
  //   // userId:
  //   dataSources: {
  //     users: new Users({ modelOrCollection: UserModel }),
  //   },
  // }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
