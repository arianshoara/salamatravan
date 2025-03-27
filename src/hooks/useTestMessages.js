import { useCallback } from 'react';
import { useMessages } from '../contexts/MessageContext';

export const useTestMessages = () => {
  const { addMessage } = useMessages();

  const sendTestResult = useCallback((testName, score, details = {}) => {
    let messageText = `نتیجه تست ${testName} شما آماده است`;
    
    // اضافه کردن توضیحات اضافی بر اساس نوع تست
    if (testName === 'سلامت روان') {
      messageText += '\nبرای مشاهده جزئیات کامل و توصیه‌های تخصصی، روی این پیام کلیک کنید.';
    } else if (testName === 'اضطراب') {
      messageText += '\nتوصیه می‌شود نتایج را با متخصص در میان بگذارید.';
    }

    addMessage({
      type: 'test_result',
      text: messageText,
      details: {
        testName,
        score,
        timestamp: new Date().toISOString(),
        ...details
      }
    });
  }, [addMessage]);

  const sendTestStart = useCallback((testName) => {
    addMessage({
      type: 'test_start',
      text: `شما در حال شروع تست "${testName}" هستید. موفق باشید!`,
    });
  }, [addMessage]);

  const sendTestInterrupted = useCallback((testName) => {
    addMessage({
      type: 'test_interrupted',
      text: `تست "${testName}" ناتمام ماند. می‌توانید در هر زمان آن را ادامه دهید.`,
    });
  }, [addMessage]);

  return {
    sendTestResult,
    sendTestStart,
    sendTestInterrupted
  };
};

export default useTestMessages; 