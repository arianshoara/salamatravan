import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaCalendarAlt, FaEnvelope, FaSave, FaGoogle } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import './Profile.css';

const Profile = ({ user }) => {
  const { translations } = useLanguage();
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    email: ''
  });
  const [saved, setSaved] = useState(false);

  // بارگیری اطلاعات پروفایل از localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error('Error parsing profile:', e);
      }
    }
    
    // اگر کاربر با گوگل لاگین کرده باشد، اطلاعات ایمیل را تنظیم کنیم
    if (user && user.email && !profile.email) {
      setProfile(prev => ({
        ...prev,
        email: user.email,
        name: user.displayName || prev.name
      }));
    }
  }, [user]);

  // هندلر تغییر فیلدهای فرم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    setSaved(false);
  };

  // ذخیره اطلاعات پروفایل
  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setSaved(true);
    
    // پیام موفقیت آمیز برای 3 ثانیه نمایش داده شود
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="profile-container">
      <h2>{translations.userProfile}</h2>
      
      {profile.name && (
        <div className="welcome-message">
          <h3>{translations.hello}, {profile.name}!</h3>
        </div>
      )}
      
      <div className="profile-form">
        <div className="form-group">
          <div className="input-icon">
            <FaUser />
          </div>
          <input
            type="text"
            name="name"
            placeholder={translations.enterName}
            value={profile.name}
            onChange={handleChange}
          />
          <label>{translations.name}</label>
        </div>
        
        <div className="form-group">
          <div className="input-icon">
            <FaCalendarAlt />
          </div>
          <input
            type="number"
            name="age"
            placeholder={translations.enterAge}
            value={profile.age}
            onChange={handleChange}
          />
          <label>{translations.age}</label>
        </div>
        
        <div className="form-group">
          <div className="input-icon">
            <FaEnvelope />
          </div>
          <input
            type="email"
            name="email"
            placeholder={translations.enterEmail}
            value={profile.email}
            onChange={handleChange}
          />
          <label>{translations.email}</label>
        </div>
        
        <button className="save-button" onClick={handleSave}>
          <FaSave /> {translations.saveProfile}
        </button>
        
        {saved && (
          <div className="save-message">
            {translations.profileSaved}
          </div>
        )}
      </div>
      
      {user && user.email && (
        <div className="google-account">
          <div className="google-icon">
            <FaGoogle />
          </div>
          <div className="google-info">
            <h4>{translations.googleAccount}</h4>
            <p>{translations.signedInWithGoogle}</p>
            <p>{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 