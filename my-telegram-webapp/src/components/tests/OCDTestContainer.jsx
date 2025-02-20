import { useState } from "react";
import OCDTestPage from "./OCDTestPage";

const OCDTestContainer = () => {
    const [testResult, setTestResult] = useState(null);

    const handleTestComplete = (result) => {
        setTestResult(result);
    };

    return (
        <div className="test-container">
            <h1>Test Container - وسواس فکری-عملی (OCD)</h1>
            <OCDTestPage onTestComplete={handleTestComplete} />
            
            {testResult && (
                <div className="test-result">
                    <h2>نتیجه تست وسواس فکری-عملی:</h2>
                    <p>نمره کل: {testResult.totalScore}</p>
                    <p>درصد: {testResult.percentage}%</p>
                    <p>تفسیر: {testResult.interpretation}</p>
                </div>
            )}
        </div>
    );
};

export default OCDTestContainer;
