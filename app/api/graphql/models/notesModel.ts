const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
  _id: { type: String, required: [true] },
  userId: { type: String, required: [true] },
  title: { type: String, required: [true, 'title required'] },
  description: { type: String, required: [true, 'description required'] },
  createdAt: { type: Date, required: [true, 'createdAt required'] },
  updatedAt: { type: Date, required: [true, 'updatedAt required'] },
  password: { type: String },
  hidden: { type: Boolean },
});

export default mongoose.models.notes || mongoose.model('notes', notesSchema);
