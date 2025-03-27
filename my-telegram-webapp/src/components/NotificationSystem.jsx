import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from "react-icons/fa";

const NotificationSystem = ({ notifications, removeNotification }) => {
  const [exitingNotifications, setExitingNotifications] = useState([]);

  // Handle notification removal with animation
  const handleRemove = (id) => {
    setExitingNotifications((prev) => [...prev, id]);
    
    // Start exit animation, remove after animation completes
    setTimeout(() => {
      removeNotification(id);
      setExitingNotifications((prev) => prev.filter((notifId) => notifId !== id));
    }, 400); // Animation duration is 400ms
  };

  // Auto-remove notifications that were just added to the exiting state
  useEffect(() => {
    const timers = [];
    
    notifications.forEach((notification) => {
      // If notification is not already exiting, set up auto-removal
      if (!exitingNotifications.includes(notification.id)) {
        const timer = setTimeout(() => {
          if (!exitingNotifications.includes(notification.id)) {
            handleRemove(notification.id);
          }
        }, notification.duration);
        
        timers.push(timer);
      }
    });
    
    // Cleanup timers
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, exitingNotifications]);

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="notification-icon success" />;
      case "warning":
        return <FaExclamationTriangle className="notification-icon warning" />;
      case "error":
        return <FaTimesCircle className="notification-icon error" />;
      case "info":
      default:
        return <FaInfoCircle className="notification-icon info" />;
    }
  };

  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type} ${
            exitingNotifications.includes(notification.id) ? "exiting" : ""
          }`}
        >
          {getIcon(notification.type)}
          <div className="notification-content">{notification.message}</div>
          <button
            className="notification-close"
            onClick={() => handleRemove(notification.id)}
            aria-label="Close notification"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

NotificationSystem.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["info", "success", "warning", "error"]),
      duration: PropTypes.number
    })
  ).isRequired,
  removeNotification: PropTypes.func.isRequired
};

export default NotificationSystem; 