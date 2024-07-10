// const express = require('express');
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';


import Attendance from '../models/Attendance.mjs';
import AddressKey from '../models/AddressKey.mjs';
import { parse } from 'json2csv';
import pdf from 'html-pdf';


const router = express.Router();

// Function to generate a random 8-digit numeric string
const generateNumericKey = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

router.post('/attendance', async (req, res) => {
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

router.get('/attendance', async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
});

router.get('/attendance/export/csv', async (req, res) => {
  try {
    const records = await Attendance.find();
    const csv = parse(records, { fields: ['studentId', 'studentName', 'addressKey', 'location', 'date'] });
    res.attachment('attendance.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting to CSV', error });
  }
});

router.get('/attendance/export/pdf', async (req, res) => {
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

router.post('/generate-key', async (req, res) => {
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


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/dashboard', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'SECRET_KEY');
    res.json({ message: 'Welcome to the dashboard' });
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
});

export default router;
