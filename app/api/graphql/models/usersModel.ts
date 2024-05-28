const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: [true, 'Name required'] },
  email: { type: String, required: [true, 'Email required'] },
  password: { type: String, required: [true, 'Password required'] },
  pin: { type: Number },
});

export default mongoose.models.users || mongoose.model('users', userSchema);
