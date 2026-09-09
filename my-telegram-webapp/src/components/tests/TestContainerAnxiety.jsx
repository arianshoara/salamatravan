import { useState } from 'react';
import AnxietyTestPage from './AnxietyTestPage';
import { TestResult } from './TestUI';
export default function TestContainerAnxiety() {
 const [result, setResult] = useState(null);
 return <div><AnxietyTestPage onTestComplete={setResult} /><TestResult result={result} /></div>;
}
