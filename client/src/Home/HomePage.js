import React from "react";
import { Link } from "react-router-dom";
import styles from "../Home/HomePage.module.css";
// import '../src/styles/HomePage.module.css'
import reader from "../assets/reader.svg";

const HomePage = () => {
  return (
    <>
      <div className="home">
        <header className="App-header text-center font-bold text-teal-700 italic text-[45px]  p-3 mb-5 bg-body rounded my-5">
          <p className="drop-shadow-2xl">Welcome to the Attendance App</p>
        </header>
      </div>
      {/* <h2>Welcome to the Attendance App</h2> */}
      <div className={styles.container}>
        <Link to="/student" className={styles.box}>
          <div className={styles.icons}>
            <img src={reader} alt="logo" />
          </div>

          <Link to="/student" className={styles.link}>
            Student
          </Link>
        </Link>

        <Link to="/faculty" className={styles.box}>
          <div className={styles.icons}>
            <img src={reader} alt="" />
          </div>

          <Link to="/faculty" className={styles.link}>
            Faculty
          </Link>
        </Link>

        <Link to="/student-portal" className={styles.box}>
          <div className={styles.icons}>
            <img src={reader} alt="" />
          </div>

          <Link to="/student-portal/todo-list" className={styles.link}>
          Admin
          </Link>
        </Link>
        
      </div>
    </>
  );
};

export default HomePage;
