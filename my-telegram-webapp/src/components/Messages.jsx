import React, { useState, useEffect, useRef } from 'react';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTrash, FaArchive, FaSearch, FaUndo, FaTimes } from 'react-icons/fa';
import './Messages.css';
import { useLanguage } from '../i18n/LanguageContext';

const Messages = () => {
  const { translations, language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [activeTab, setActiveTab] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);

  // بارگیری پیام‌ها و نتایج آزمون‌ها از localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('userMessages');
    const storedTestResults = localStorage.getItem('testResults');
    
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error('Error parsing messages:', e);
        setMessages([]);
      }
    }
    
    if (storedTestResults) {
      try {
        setTestResults(JSON.parse(storedTestResults));
      } catch (e) {
        console.error('Error parsing test results:', e);
        setTestResults([]);
      }
    }
  }, []);

  // ذخیره تغییرات در localStorage
  const saveMessages = (updatedMessages) => {
    setMessages(updatedMessages);
    localStorage.setItem('userMessages', JSON.stringify(updatedMessages));
  };

  const saveTestResults = (updatedResults) => {
    setTestResults(updatedResults);
    localStorage.setItem('testResults', JSON.stringify(updatedResults));
  };

  // حذف پیام یا نتیجه آزمون
  const deleteMessage = (id) => {
    if (window.confirm(translations.deleteMessage + '?')) {
      const updatedMessages = messages.filter(msg => msg.id !== id);
      saveMessages(updatedMessages);
    }
  };

  const deleteTestResult = (id) => {
    if (window.confirm(translations.deleteMessage + '?')) {
      const updatedResults = testResults.filter(result => result.id !== id);
      saveTestResults(updatedResults);
    }
  };

  // آرشیو کردن پیام
  const toggleArchiveMessage = (id) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === id) {
        return {
          ...msg,
          archived: !msg.archived
        };
      }
      return msg;
    });
    saveMessages(updatedMessages);
  };

  // فیلتر کردن پیام‌ها و نتایج آزمون بر اساس جستجو
  const filteredMessages = messages.filter(msg => 
    (msg.title && msg.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (msg.content && msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTestResults = testResults.filter(result => 
    (result.title && result.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (result.description && result.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // دریافت آیکون بر اساس نوع پیام
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="message-icon success" />;
      case 'warning':
        return <FaExclamationTriangle className="message-icon warning" />;
      case 'error':
        return <FaTimesCircle className="message-icon error" />;
      case 'info':
      default:
        return <FaInfoCircle className="message-icon info" />;
    }
  };

  return (
    <div className="messages-container">
      <h2>{translations.messages}</h2>
      
      <div className="messages-search">
        {isSearchExpanded ? (
          <div className="messages-search-expanded">
            <input
              type="text"
              placeholder={translations.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={searchInputRef}
            />
            <button className="search-clear-button" onClick={() => setIsSearchExpanded(false)}>
              <FaTimes />
            </button>
          </div>
        ) : (
          <button className="messages-search-icon" onClick={() => {
            setIsSearchExpanded(true);
            setTimeout(() => searchInputRef.current.focus(), 100);
          }}>
            <FaSearch />
          </button>
        )}
      </div>
      
      <div className="messages-tabs">
        <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          {translations.messages}
        </button>
        <button
          className={activeTab === 'testResults' ? 'active' : ''}
          onClick={() => setActiveTab('testResults')}
        >
          {translations.testResults}
        </button>
      </div>
      
      {activeTab === 'messages' && (
        <div className="messages-list">
          {filteredMessages.length > 0 ? (
            filteredMessages.map(msg => (
              <div 
                key={msg.id} 
                className={`message-item ${msg.archived ? 'archived' : ''}`}
              >
                <div className="message-content">
                  <h3>{msg.title}</h3>
                  <p>{msg.content}</p>
                  <small>{translations.date}: {new Date(msg.date).toLocaleDateString()}</small>
                </div>
                <div className="message-actions">
                  <button 
                    className="action-button archive"
                    onClick={() => toggleArchiveMessage(msg.id)}
                    title={msg.archived ? translations.unarchiveMessage : translations.archiveMessage}
                  >
                    {msg.archived ? <FaUndo /> : <FaArchive />}
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => deleteMessage(msg.id)}
                    title={translations.deleteMessage}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data-message">{translations.noMessages}</p>
          )}
        </div>
      )}
      
      {activeTab === 'testResults' && (
        <div className="test-results-list">
          {filteredTestResults.length > 0 ? (
            filteredTestResults.map(result => (
              <div key={result.id} className="test-result-item">
                <div className="test-result-content">
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                  <div className="test-score">
                    <span>{translations.testScore}: {result.score}</span>
                  </div>
                  <small>{translations.date}: {new Date(result.date).toLocaleDateString()}</small>
                </div>
                <div className="message-actions">
                  <button 
                    className="action-button delete"
                    onClick={() => deleteTestResult(result.id)}
                    title={translations.deleteMessage}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data-message">{translations.noTestResults}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages; 