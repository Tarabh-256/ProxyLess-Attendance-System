import React from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profile}>
      <h2>Student Profile</h2>
      <div className={styles.profileDetails}>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Enrollment Number:</strong> 123456</p>
      </div>
    </div>
  );
};

export default Profile;
