import React from 'react';
import PropTypes from 'prop-types';
import { FaBell } from 'react-icons/fa';
import { useMessages } from '../contexts/MessageContext';
import './MessageIndicator.css';

const MessageIndicator = ({ onClick }) => {
  const { unreadCount } = useMessages();

  return (
    <button className="message-indicator" onClick={onClick} aria-label="پیام‌ها">
      <div className="message-icon-wrapper">
        <FaBell className="message-icon" />
        {unreadCount > 0 && (
          <span className="message-badge" aria-label={`${unreadCount} پیام خوانده نشده`}>
            {unreadCount}
          </span>
        )}
      </div>
    </button>
  );
};

MessageIndicator.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default MessageIndicator; 