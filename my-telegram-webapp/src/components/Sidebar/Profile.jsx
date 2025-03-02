import { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    email: '',
    googleSignIn: false,
    testResults: [],
  });

  useEffect(() => {
    // فرض می‌کنیم اطلاعات پروفایل از localStorage یا API دریافت می‌شود
    const savedProfileData = JSON.parse(localStorage.getItem('profile')) || {
      name: '',
      age: '',
      email: '',
      googleSignIn: false,
      testResults: [],
    };
    setProfileData(savedProfileData);
  }, []);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profileData));
    alert('پروفایل شما با موفقیت ذخیره شد.');
  };

  return (
    <div className="profile-container">
      <h2>پروفایل کاربری</h2>
      <div className="profile-form">
        <label>نام:</label>
        <input type="text" name="name" value={profileData.name} onChange={handleInputChange} />

        <label>سن:</label>
        <input type="number" name="age" value={profileData.age} onChange={handleInputChange} />

        <label>ایمیل:</label>
        <input type="email" name="email" value={profileData.email} onChange={handleInputChange} />

        <button onClick={handleSaveProfile}>ذخیره پروفایل</button>
      </div>

      {profileData.googleSignIn && (
        <div className="google-profile">
          <h3>ورود با گوگل</h3>
          <p>شما با استفاده از حساب گوگل خود وارد شده‌اید.</p>
        </div>
      )}

      <div className="test-results">
        <h3>نتایج تست‌ها</h3>
        {profileData.testResults.length === 0 ? (
          <p>هنوز نتیجه تستی ثبت نشده است.</p>
        ) : (
          <ul>
            {profileData.testResults.map((result, index) => (
              <li key={index}>
                {result.testName}: {result.score}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;