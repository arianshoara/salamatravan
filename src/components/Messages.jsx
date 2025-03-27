import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaBell, FaTimes, FaCheck, FaTrash } from 'react-icons/fa';
import { useMessages } from '../contexts/MessageContext';
import './Messages.css';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const rtf = new Intl.RelativeTimeFormat('fa', { numeric: 'auto' });

  if (diff < 60000) { // کمتر از 1 دقیقه
    return 'همین الان';
  } else if (diff < 3600000) { // کمتر از 1 ساعت
    const minutes = Math.floor(diff / 60000);
    return rtf.format(-minutes, 'minute');
  } else if (diff < 86400000) { // کمتر از 1 روز
    const hours = Math.floor(diff / 3600000);
    return rtf.format(-hours, 'hour');
  } else if (diff < 604800000) { // کمتر از 1 هفته
    const days = Math.floor(diff / 86400000);
    return rtf.format(-days, 'day');
  } else {
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
};

const MessageItem = ({ message, onMarkAsRead }) => {
  const handleClick = useCallback(() => {
    if (!message.read) {
      onMarkAsRead(message.id);
    }
  }, [message.id, message.read, onMarkAsRead]);

  return (
    <div
      className={`message-item ${!message.read ? 'unread' : ''}`}
      onClick={handleClick}
    >
      <div className="message-content">
        <div className="message-header">
          <span className={`message-type ${message.type}`}>
            {message.type === 'welcome' ? '🎉' : 
             message.type === 'test_result' ? '📊' : '📬'}
          </span>
          <span className="message-time">{formatDate(message.timestamp)}</span>
        </div>
        <p>{message.text}</p>
        {message.type === 'test_result' && message.details && (
          <div className="test-details">
            <div className="score">امتیاز: {message.details.score}</div>
            {message.details.breakdown && (
              <div className="score-breakdown">
                {Object.entries(message.details.breakdown).map(([key, value]) => (
                  <div key={key} className="breakdown-item">
                    <span>{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    details: PropTypes.object
  }).isRequired,
  onMarkAsRead: PropTypes.func.isRequired
};

const Messages = ({ isOpen, onClose, userName }) => {
  const { messages, unreadCount, addMessage, markAsRead, markAllAsRead, clearMessages } = useMessages();

  useEffect(() => {
    if (userName && !messages.some(msg => msg.type === 'welcome')) {
      addMessage({
        type: 'welcome',
        text: `${userName} عزیز، خوش آمدید به سامانه سلامت روان`
      });
    }
  }, [userName, messages, addMessage]);

  const handleMarkAllRead = useCallback(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  const handleClearMessages = useCallback(() => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید همه پیام‌ها را پاک کنید؟')) {
      clearMessages();
    }
  }, [clearMessages]);

  return (
    <div className={`messages-drawer ${isOpen ? 'open' : ''}`}>
      <div className="messages-header">
        <div className="header-title">
          <h3>پیام‌ها</h3>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        <div className="header-actions">
          {messages.length > 0 && (
            <>
              <button
                className="action-button"
                onClick={handleMarkAllRead}
                title="خواندن همه"
              >
                <FaCheck />
              </button>
              <button
                className="action-button"
                onClick={handleClearMessages}
                title="پاک کردن همه"
              >
                <FaTrash />
              </button>
            </>
          )}
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
      </div>
      
      <div className="messages-list">
        {messages.length === 0 ? (
          <div className="no-messages">
            <FaBell className="empty-icon" />
            <p>پیامی موجود نیست</p>
          </div>
        ) : (
          messages.map(message => (
            <MessageItem
              key={message.id}
              message={message}
              onMarkAsRead={markAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

Messages.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userName: PropTypes.string
};

Messages.defaultProps = {
  userName: null
};

export default Messages; 