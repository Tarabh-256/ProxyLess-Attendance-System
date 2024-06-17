import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './styles/AttendanceForm.module.css';

// Fix for default icon issues in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// 22.489819798644515, 80.08628956466482 indias longitude and altitude
const AttendanceForm = () => {
  const [location, setLocation] = useState({ lat: 22.489819798644515, lng: 80.08628956466482 });
  const [addressKey, setAddressKey] = useState('');
  const [message, setMessage] = useState('');

  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location: ', error);
        setMessage('Error getting location');
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/attendance`, {
        studentId,
        studentName,
        addressKey,
        location,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error recording attendance:', error);
      setMessage('Error recording attendance');
    }
  };

  return (
    <div className={styles.container}>
      {/* <h2>Student Attendance Page</h2> */}
      <form className={styles.form} onSubmit={handleSubmit}>

      <div>
        <label className={styles.label}>Student ID:</label>
        <input
          className={styles.input}
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={styles.label}>Student Name:</label>
        <input
          className={styles.input}
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
      </div>


        <div>
          <label className={styles.label}>Address Key: </label>
          <input
            className={styles.input}
            type="text"
            value={addressKey}
            onChange={(e) => setAddressKey(e.target.value)}
            required
          />
        </div>

        <button className={styles.button} type="submit">Submit Attendance</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
      <MapContainer center={location} zoom={4} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location}>
          <Popup>
            Your Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default AttendanceForm;
