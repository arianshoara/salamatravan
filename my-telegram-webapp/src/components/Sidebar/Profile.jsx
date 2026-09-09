import { readStored, writeStored } from '../../lib/storage';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaPhone, FaSave, FaCamera, FaGoogle } from 'react-icons/fa';
import { useLanguage } from '../../i18n/LanguageContext';
import './Profile.css';

const Profile = () => {
  const { translations: t } = useLanguage();
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
    const savedProfileData = readStored('profile', null) || {
      name: '',
      age: '',
      email: '',
      phone: '',
      bio: '',
      avatar: null,
      googleSignIn: false,
      testResults: [],
    };
    if (savedProfileData && typeof savedProfileData === 'object' && !Array.isArray(savedProfileData)) setProfileData(prev => ({ ...prev, ...savedProfileData, testResults: Array.isArray(savedProfileData.testResults) ? savedProfileData.testResults : [] }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    setSaveStatus('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) { setSaveStatus(t.invalidAvatar); return; }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
        setSaveStatus('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!writeStored('profile', profileData)) { setSaveStatus(t.profileSaveFailed); return; }
    setSaveStatus(t.profileSaved);
    setIsEditing(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar-wrapper">
            {profileData.avatar ? (
              <img src={profileData.avatar} alt={t.avatarAlt} className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                <FaUser />
              </div>
            )}
            {isEditing && (
              <label className="avatar-upload-label">
                <FaCamera />
                <input
                  type="file" aria-label={t.avatarLabel}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="avatar-upload-input"
                />
              </label>
            )}
          </div>
        </div>
        <h1>{t.userProfile}</h1><p>{t.profileStorage}</p>
        <button 
          className={`edit-button ${isEditing ? 'active' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? t.cancelEdit : t.editProfile}
        </button>
      </div>

      <div className="profile-form">
        <div className="form-group">
          <div className="input-icon">
            <FaUser />
          </div>
          <input
            type="text"
            name="name" aria-label={t.name}
            value={profileData.name}
            onChange={handleInputChange}
            placeholder={t.enterName}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaCalendarAlt />
          </div>
          <input
            type="number"
            name="age" aria-label={t.age}
            value={profileData.age}
            onChange={handleInputChange}
            placeholder={t.enterAge}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaEnvelope />
          </div>
          <input
            type="email"
            name="email" aria-label={t.email}
            value={profileData.email}
            onChange={handleInputChange}
            placeholder={t.enterEmail}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaPhone />
          </div>
          <input
            type="tel"
            name="phone" aria-label={t.phone}
            value={profileData.phone}
            onChange={handleInputChange}
            placeholder={t.enterPhone}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <textarea
            name="bio" aria-label={t.bio}
            value={profileData.bio}
            onChange={handleInputChange}
            placeholder={t.enterBio}
            disabled={!isEditing}
            rows="4"
          />
        </div>

        {isEditing && (
          <button className="save-button" onClick={handleSaveProfile}>
            <FaSave /> {t.saveProfile}
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
            <h4>{t.googleAccount}</h4>
            <p>{t.signedInWithGoogle}</p>
          </div>
        </div>
      )}

      <div className="test-results-section">
        <h3>{t.testResults}</h3>
        {profileData.testResults.length === 0 ? (
          <p className="no-results">{t.noTestsTaken}</p>
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
