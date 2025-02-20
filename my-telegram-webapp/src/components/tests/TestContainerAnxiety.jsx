import { useState } from "react";
import AnxietyTestPage from "./AnxietyTestPage";

const TestContainerAnxiety = () => {
    const [testResult, setTestResult] = useState(null);

    const handleTestComplete = (result) => {
        setTestResult(result);
    };

    return (
        <div className="test-container">
            <h1>Test Container - اضطراب</h1>
            <AnxietyTestPage onTestComplete={handleTestComplete} />
            
            {testResult ? (
                <div className="test-result">
                    <h2>نتیجه تست اضطراب:</h2>
                    <p>نمره کل: {testResult.totalScore}</p>
                    <p>درصد: {testResult.percentage}%</p>
                    <p>تفسیر: {testResult.interpretation}</p>
                </div>
            ) : null}
        </div>
    );
};

export default TestContainerAnxiety;
