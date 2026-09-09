import { useState } from 'react';
import OCDTestPage from './OCDTestPage';
import { TestResult } from './TestUI';
export default function OCDTestContainer() {
 const [result, setResult] = useState(null);
 return <div><OCDTestPage onTestComplete={setResult} /><TestResult result={result} /></div>;
}
