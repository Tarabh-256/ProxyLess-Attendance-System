import React, { useEffect, useState } from "react";
// import axios from "axios";
import API from '../services/api';
import {  TableHead, TableRow, TableCell } from '@mui/material';
import styles from "../../styles/AttendanceTable.module.css";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

function refreshPage() {
  setTimeout(()=>{
      window.location.reload(false);
  }, 500);
  console.log('page to reload')
};

const AttendanceReport = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await API.get(
          '/attendance'
        );
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchRecords();
  }, []);

  const exportToCSV = async () => {
    try {
      const response = await API.get(
        '/attendance/export/csv',
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8;",
      });
      saveAs(blob, "attendance.csv");
    } catch (error) {
      console.error("Error exporting to CSV:", error);
    }
  };

  const exportToPDF = async () => {
    try {
      const response = await API.get(
        '/attendance/export/pdf',
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "attendance.pdf");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "attendance.xlsx");
  };

  return (
    <>
      <h2 className="text-xl italic font-bold font-[monospace] mt-11">Attendance Records</h2>
      <div className={styles.exportButtons}>
        <button onClick={refreshPage}>Refresh</button>
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
    <div className={styles.container}>
      <table className={styles.table}>
        {/* <theadn >
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Address Key</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Date</th>
          </tr>
        </theadn> */}
        <TableHead>
          <TableRow>
            <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Student ID</TableCell>
            <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Student Name</TableCell>
            <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Address Key</TableCell>
            <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Latitude</TableCell>
            <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Longitude</TableCell>
            <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Date</TableCell>
          </TableRow>
        </TableHead>






        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.studentId}</td>
              <td>{record.studentName}</td>
              <td>{record.addressKey}</td>
              <td>{record.location.lat}</td>
              <td>{record.location.lng}</td>
              <td>{new Date(record.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AttendanceReport;
