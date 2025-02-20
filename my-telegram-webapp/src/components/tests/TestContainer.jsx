import DepressionTestPage from './DepressionTestPage';
import { useState } from "react";

const TestContainer = () => {
    const [testResult, setTestResult] = useState(null);

    const handleTestComplete = (result) => {
        setTestResult(result);
    };

    return (
        <div className="test-container">
            <h1>Test Container</h1>
            <DepressionTestPage onTestComplete={handleTestComplete} />
            
            {testResult ? (
                <div className="test-result">
                    <h2>نتیجه تست افسردگی:</h2>
                    <p>نمره کل: {testResult.totalScore}</p>
                    <p>درصد: {testResult.percentage}%</p>
                    <p>تفسیر: {testResult.interpretation}</p>
                </div>
            ) : null}
        </div>
    );
};

export default TestContainer;
