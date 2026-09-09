import { useState } from 'react';
import DepressionTestPage from './DepressionTestPage';
import { TestResult } from './TestUI';
export default function TestContainer() {
 const [result, setResult] = useState(null);
 return <div><DepressionTestPage onTestComplete={setResult} /><TestResult result={result} /></div>;
}
