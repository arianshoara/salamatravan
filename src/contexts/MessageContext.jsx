import React, { createContext, useContext, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

const MessageContext = createContext();

const initialState = {
  messages: [],
  unreadCount: 0
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        messages: [action.payload, ...state.messages],
        unreadCount: state.unreadCount + 1
      };
    case 'MARK_AS_READ':
      return {
        messages: state.messages.map(msg =>
          msg.id === action.payload ? { ...msg, read: true } : msg
        ),
        unreadCount: state.unreadCount - 1
      };
    case 'MARK_ALL_AS_READ':
      return {
        messages: state.messages.map(msg => ({ ...msg, read: true })),
        unreadCount: 0
      };
    case 'CLEAR_MESSAGES':
      return initialState;
    default:
      return state;
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const addMessage = useCallback((message) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...message
      }
    });
  }, []);

  const markAsRead = useCallback((messageId) => {
    dispatch({ type: 'MARK_AS_READ', payload: messageId });
  }, []);

  const markAllAsRead = useCallback(() => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  const value = {
    messages: state.messages,
    unreadCount: state.unreadCount,
    addMessage,
    markAsRead,
    markAllAsRead,
    clearMessages
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

export default MessageContext; 