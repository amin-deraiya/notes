import UserModel from '../models/usersModel';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import sessionModel from '../models/sessionModel';
// const { UserModel } = require('../models/index');
// "MongoDataSource constructor must be given a collection or Mongoose model"
interface SessionDocument {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  pin: number;
}

export default class Sessions extends MongoDataSource<SessionDocument> {
  async isSessionExpired() {
    const session_id = cookies()?.get('session_id')?.value;
    console.log(session_id, "session_idsession_idsession_idsession_id");
    
    if (session_id) {
      return await sessionModel.findOne({ sessionId: session_id }).where('expireAt').gt(new Date());
    } else {
      return false;
    }
  }
}
