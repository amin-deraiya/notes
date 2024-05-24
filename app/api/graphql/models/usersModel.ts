const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: [true, 'Name required'] },
  email: { type: String, required: [true, 'Email required'] },
  password: { type: String, required: [true, 'Password required'] },
  pin: { type: Number },
});

const sessionSchema = new Schema({
  sessionId: { type: String, required: [true, 'Session ID Required'] },
  createdAt: { type: Date, required: [true, 'CreatedAt required'] },
  expireAt: { type: Date, required: [true, 'expireAt required'] },
  expired: { type: Boolean },
  token: { type: String },
});

// module.exports = {
//   UserModel: mongoose.models.users || mongoose.model('users', userSchema),
//   SessionModel: mongoose.models.session || mongoose.model('session', sessionSchema),
// };
export default mongoose.models.users || mongoose.model('users', userSchema);
