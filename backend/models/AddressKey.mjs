import mongoose from 'mongoose';

const addressKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: '10m', default: Date.now }, // Key expires after 10 minutes
});

export default mongoose.model('AddressKey', addressKeySchema);
