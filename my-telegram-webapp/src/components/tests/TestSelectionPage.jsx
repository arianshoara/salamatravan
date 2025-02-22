//import React from "react";
import PropTypes from 'prop-types';
import "./TestSelectionPage.css"; // استایل‌های صفحه انتخاب تست

const TestSelectionPage = ({ onTestSelect }) => {
    return (
        <div className="test-selection-container">
            <h2>📚 صفحه انتخاب تست</h2>
            <p className="selection-description">لطفاً تست مورد نظر خود را از لیست زیر انتخاب کنید:</p>
            <ul className="test-list">
                <li className="test-item" onClick={() => onTestSelect("bigFive")}>
                    <span className="test-icon">👤</span>
                    تست شخصیت پنج عاملی (Big Five)
                    <p className="test-description">
                        این تست به شما کمک می‌کند تا پنج بُعد اصلی شخصیت خود را بهتر بشناسید:
                        گشودگی به تجربه، وظیفه‌شناسی، برون‌گرایی، توافق‌پذیری، و روان‌رنجوری.
                    </p>
                </li>
                <li className="test-item" onClick={() => onTestSelect("addiction")}>
                    <span className="test-icon">⚠️</span>
                    تست اعتیاد
                    <p className="test-description">
                        این تست به شما کمک می‌کند تا احتمال اعتیاد به رفتارهای مختلف را در خود ارزیابی کنید.
                    </p>
                </li>
                {/* می‌توانید تست‌های دیگر را به لیست اضافه کنید */}
            </ul>
        </div>
    );
};

TestSelectionPage.propTypes = {
    onTestSelect: PropTypes.func.isRequired,
};


export default TestSelectionPage;