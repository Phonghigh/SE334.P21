import React, { useState, useEffect, createContext, useContext } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineClose } from "react-icons/ai";

/**
 * Notification System for better user experience
 * Provides toast notifications for success, error, warning, and info messages
 * Supports auto-dismiss and manual dismiss functionality
 */

// Notification Context
const NotificationContext = createContext();

// Notification types
const NOTIFICATION_TYPES = {
  success: {
    icon: AiOutlineCheckCircle,
    bgColor: "bg-green-500",
    textColor: "text-green-50",
    borderColor: "border-green-400"
  },
  error: {
    icon: AiOutlineCloseCircle,
    bgColor: "bg-red-500",
    textColor: "text-red-50",
    borderColor: "border-red-400"
  },
  warning: {
    icon: AiOutlineWarning,
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-50",
    borderColor: "border-yellow-400"
  },
  info: {
    icon: AiOutlineInfoCircle,
    bgColor: "bg-blue-500",
    textColor: "text-blue-50",
    borderColor: "border-blue-400"
  }
};

/**
 * Individual Notification Component
 * @param {Object} notification - Notification object with id, type, title, message, duration
 * @param {Function} onRemove - Function to remove notification
 */
const NotificationItem = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const { icon: Icon, bgColor, textColor, borderColor } = NOTIFICATION_TYPES[notification.type];

  useEffect(() => {
    // Fade in animation
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // Auto-dismiss after duration
    if (notification.duration > 0) {
      const dismissTimer = setTimeout(() => {
        handleRemove();
      }, notification.duration);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(dismissTimer);
      };
    }

    return () => clearTimeout(showTimer);
  }, [notification.duration]);

  /**
   * Handle notification removal with fade out animation
   */
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible && !isRemoving
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div className={`${bgColor} ${textColor} ${borderColor} border rounded-lg shadow-lg p-4 mb-3 max-w-sm w-full backdrop-blur-sm bg-opacity-90`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6" />
          </div>
          
          <div className="ml-3 w-0 flex-1">
            {notification.title && (
              <p className="text-sm font-medium">
                {notification.title}
              </p>
            )}
            <p className={`text-sm ${notification.title ? "mt-1" : ""}`}>
              {notification.message}
            </p>
          </div>
          
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={handleRemove}
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Progress bar for auto-dismiss */}
        {notification.duration > 0 && (
          <div className="mt-3 w-full bg-white bg-opacity-20 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full transition-all duration-linear"
              style={{
                animation: `shrink ${notification.duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Notification Container Component
 * Renders all active notifications
 */
const NotificationContainer = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

/**
 * Notification Provider Component
 * Manages notification state and provides context
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Add a new notification
   * @param {string} type - Notification type (success, error, warning, info)
   * @param {string} message - Notification message
   * @param {string} title - Optional notification title
   * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
   */
  const addNotification = (type, message, title = "", duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      type,
      message,
      title,
      duration
    };

    setNotifications(prev => [...prev, notification]);
  };

  /**
   * Remove notification by ID
   * @param {string|number} id - Notification ID
   */
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  /**
   * Clear all notifications
   */
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Convenience methods for different notification types
  const notify = {
    success: (message, title, duration) => addNotification("success", message, title, duration),
    error: (message, title, duration) => addNotification("error", message, title, duration),
    warning: (message, title, duration) => addNotification("warning", message, title, duration),
    info: (message, title, duration) => addNotification("info", message, title, duration)
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    notify
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer 
        notifications={notifications}
        removeNotification={removeNotification}
      />
      
      {/* CSS Animation for progress bar */}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </NotificationContext.Provider>
  );
};

/**
 * Hook to use notification system
 * @returns {Object} Notification context value
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}; 