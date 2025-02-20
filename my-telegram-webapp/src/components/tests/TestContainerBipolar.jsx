import { useState } from "react";
import BipolarTestPage from "./BipolarTestPage";

const BipolarTestContainer = () => {
    const [testResult, setTestResult] = useState(null);

    const handleTestComplete = (result) => {
        setTestResult(result);
    };

    return (
        <div className="test-container">
            <h1>Test Container - اختلال دوقطبی</h1>
            <BipolarTestPage onTestComplete={handleTestComplete} />
            
            {testResult && (
                <div className="test-result">
                    <h2>نتیجه تست اختلال دوقطبی:</h2>
                    <p>نمره کل: {testResult.totalScore}</p>
                    <p>درصد: {testResult.percentage}%</p>
                    <p>تفسیر: {testResult.interpretation}</p>
                </div>
            )}
        </div>
    );
};

export default BipolarTestContainer;
