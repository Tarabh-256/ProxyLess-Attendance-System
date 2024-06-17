import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/AttendanceTable.module.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const AttendanceTable = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/attendance`
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
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/attendance/export/csv`,
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
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/attendance/export/pdf`,
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
    <div className={styles.container}>
      <div className={styles.exportButtons}>
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Address Key</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Date</th>
          </tr>
        </thead>
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

export default AttendanceTable;
