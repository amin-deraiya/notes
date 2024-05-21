import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import Users from "./datasources";
import UserModel from "./models";

const uri = "mongodb+srv://aminwork192:bHf7ABAOA3AgJwhe@cluster0.w6tm9v0.mongodb.net/notes-db";
const port = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log("🎉 connected to database successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
connectDB();

const server: any = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {
      users: new Users({ modelOrCollection: UserModel }),
    },
  }),
});


export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
