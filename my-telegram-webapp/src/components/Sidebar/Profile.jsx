import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaPhone, FaSave, FaCamera, FaGoogle } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    bio: '',
    avatar: null,
    googleSignIn: false,
    testResults: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // فرض می‌کنیم اطلاعات پروفایل از localStorage یا API دریافت می‌شود
    const savedProfileData = JSON.parse(localStorage.getItem('profile')) || {
      name: '',
      age: '',
      email: '',
      phone: '',
      bio: '',
      avatar: null,
      googleSignIn: false,
      testResults: [],
    };
    setProfileData(savedProfileData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    setSaveStatus('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
        setSaveStatus('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profileData));
    setSaveStatus('پروفایل شما با موفقیت ذخیره شد');
    setIsEditing(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar-wrapper">
            {profileData.avatar ? (
              <img src={profileData.avatar} alt="avatar" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                <FaUser />
              </div>
            )}
            {isEditing && (
              <label className="avatar-upload-label">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>
        <h2>پروفایل کاربری</h2>
        <button 
          className={`edit-button ${isEditing ? 'active' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'لغو ویرایش' : 'ویرایش پروفایل'}
        </button>
      </div>

      <div className="profile-form">
        <div className="form-group">
          <div className="input-icon">
            <FaUser />
          </div>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder="نام و نام خانوادگی"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaCalendarAlt />
          </div>
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleInputChange}
            placeholder="سن"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaEnvelope />
          </div>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            placeholder="ایمیل"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaPhone />
          </div>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            placeholder="شماره تماس"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            placeholder="درباره من..."
            disabled={!isEditing}
            rows="4"
          />
        </div>

        {isEditing && (
          <button className="save-button" onClick={handleSaveProfile}>
            <FaSave /> ذخیره تغییرات
          </button>
        )}

        {saveStatus && (
          <div className="save-status success">
            {saveStatus}
          </div>
        )}
      </div>

      {profileData.googleSignIn && (
        <div className="google-profile">
          <div className="google-icon">
            <FaGoogle />
          </div>
          <div className="google-info">
            <h4>حساب گوگل</h4>
            <p>شما با حساب گوگل خود وارد شده‌اید</p>
          </div>
        </div>
      )}

      <div className="test-results-section">
        <h3>نتایج تست‌ها</h3>
        {profileData.testResults.length === 0 ? (
          <p className="no-results">هنوز در هیچ تستی شرکت نکرده‌اید</p>
        ) : (
          <div className="results-list">
            {profileData.testResults.map((result, index) => (
              <div key={index} className="result-item">
                <h4>{result.testName}</h4>
                <div className="score-bar">
                  <div 
                    className="score-fill" 
                    style={{ width: `${result.score}%` }}
                  />
                </div>
                <span className="score-value">{result.score}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;