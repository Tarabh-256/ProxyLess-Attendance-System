import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Attendance from './models/Attendance.mjs';
import bodyParser from 'body-parser';
import AddressKey from './models/AddressKey.mjs';
import { parse } from 'json2csv';
import pdf from 'html-pdf';


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas', error);
});

// Function to generate a random 8-digit numeric string
const generateNumericKey = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

app.post('/attendance', async (req, res) => {
  const { studentId, studentName, addressKey, location } = req.body;

  try {
    const keyExists = await AddressKey.findOne({ key: addressKey });
    if (!keyExists) {
      return res.status(400).json({ message: 'Invalid or expired address key' });
    }

    const attendance = new Attendance({
      studentId, studentName,
      addressKey,
      location,
    });
    await attendance.save();
    res.status(200).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ message: 'Error recording attendance' });
  }
});

app.get('/attendance', async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
});

app.get('/attendance/export/csv', async (req, res) => {
  try {
    const records = await Attendance.find();
    const csv = parse(records, { fields: ['studentId', 'studentName', 'addressKey', 'location', 'date'] });
    res.attachment('attendance.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting to CSV', error });
  }
});

app.get('/attendance/export/pdf', async (req, res) => {
  try {
    const records = await Attendance.find();
    const html = `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Attendance Records</h1>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Address Key</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(record => `
                <tr>
                  <td>${record.studentId}</td>
                  <td>${record.studentName}</td>
                  <td>${record.addressKey}</td>
                  <td>${record.location.lat}, ${record.location.lng}</td>
                  <td>${new Date(record.date).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    pdf.create(html).toStream((err, stream) => {
      if (err) {
        return res.status(500).json({ message: 'Error exporting to PDF', error: err });
      }
      res.setHeader('Content-type', 'application/pdf');
      stream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error exporting to PDF', error });
  }
});

app.post('/generate-key', async (req, res) => {
  try {
    const addressKey = generateNumericKey();
    const newAddressKey = new AddressKey({ key: addressKey });
    await newAddressKey.save();
    res.status(200).json({ key: addressKey });
  } catch (error) {
    console.error('Error generating address key:', error);
    res.status(500).json({ message: 'Error generating address key' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
