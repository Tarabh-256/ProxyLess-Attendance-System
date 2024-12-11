import React, { useEffect, useState } from "react";
import API from '../services/api';
import { TableHead, TableRow, TableCell } from '@mui/material';
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
  const [loading, setLoading] = useState(false); // State to manage loading

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

  const deleteRecord = async (id) => {
    setLoading(true); // Set loading to true when delete starts
    try {
      await API.delete(`/attendance/${id}`);
      setRecords(records.filter(record => record._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      setLoading(false); // Set loading to false when delete ends
    }
  };

  return (
    <>
      <div className={`${styles.exportButtons} pt-3 flex-wrap gap-x-60 justify-end`}>
        <span className='font-bold font-serif text-2xl  text-cyan-500 italic' >Attendance Records</span>
          <div>
            <button onClick={refreshPage}>Refresh</button>
            <button onClick={exportToCSV}>Export to CSV</button>
            <button onClick={exportToPDF}>Export to PDF</button>
            <button onClick={exportToExcel}>Export to Excel</button>
          </div>
      </div>
      {loading && <div>Loading...</div>} {/* Display loading message */}
      <div className={styles.container}>
        <table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Student ID</TableCell>
              <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Student Name</TableCell>
              <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Address Key</TableCell>
              <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Latitude</TableCell>
              <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Longitude</TableCell>
              <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Date</TableCell>
              <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'rgb(0 123 255)', zIndex: 1, textAlign: 'center', color: 'white',fontSize: '18px' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <tbody className=' text-center'>
            {records.map((record) => (
              <tr key={record._id}>
                <td>{record.studentId}</td>
                <td>{record.studentName}</td>
                <td>{record.addressKey}</td>
                <td>{record.location.lat}</td>
                <td>{record.location.lng}</td>
                <td>{new Date(record.createdAt).toLocaleString()}</td>
                <td>
                  <button className='bg-red-600 px-3 py-1 rounded-full text-white font-bold' onClick={() => deleteRecord(record._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AttendanceReport;
