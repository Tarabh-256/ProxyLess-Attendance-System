import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/HomePage.module.css";
// import '../src/styles/HomePage.module.css'
import reader from "../src/assets/reader.svg";

const HomePage = () => {
  return (
    <>
      <div className="App">
        <header className="App-header text-center font-bold text-teal-700 italic text-[45px]  p-3 mb-5 bg-body rounded my-5">
          <p class="drop-shadow-2xl">Welcome to the Attendance App</p>
        </header>
      </div>
      {/* <h2>Welcome to the Attendance App</h2> */}
      <div className={styles.container}>
        <a href="/student" className={styles.box}>
          <div className={styles.icons}>
            <img src={reader} alt="" />
          </div>
          <Link to="/student" className={styles.link}>
            Student
          </Link>
        </a>

        <a href="/faculty" className={styles.box}>
          <div className={styles.icons}>
            <img src={reader} alt="" />
          </div>
          <Link to="/faculty" className={styles.link}>
            Faculty
          </Link>
        </a>
      </div>
    </>
  );
};

export default HomePage;
