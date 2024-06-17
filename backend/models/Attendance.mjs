import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  addressKey: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
