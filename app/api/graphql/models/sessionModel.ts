const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
  sessionId: { type: String, required: [true, 'Session ID Required'] },
  createdAt: { type: Date, required: [true, 'CreatedAt required'] },
  expireAt: { type: Date, required: [true, 'expireAt required'] },
  expired: { type: Boolean },
  token: { type: String },
});

export default mongoose.models.session || mongoose.model('session', sessionSchema);
