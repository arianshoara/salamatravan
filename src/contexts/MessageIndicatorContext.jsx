import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const MessageIndicatorContext = createContext();

export const MessageIndicatorProvider = ({ children }) => {
  const [showMessageIndicator, setShowMessageIndicator] = useState(true);

  const toggleMessageIndicator = useCallback(() => {
    setShowMessageIndicator(prev => !prev);
  }, []);

  const value = {
    showMessageIndicator,
    toggleMessageIndicator,
    setShowMessageIndicator
  };

  return (
    <MessageIndicatorContext.Provider value={value}>
      {children}
    </MessageIndicatorContext.Provider>
  );
};

MessageIndicatorProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useMessageIndicator = () => {
  const context = useContext(MessageIndicatorContext);
  if (!context) {
    throw new Error('useMessageIndicator must be used within a MessageIndicatorProvider');
  }
  return context;
};

export default MessageIndicatorContext; 