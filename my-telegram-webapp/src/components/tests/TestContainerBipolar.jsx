import { useState } from 'react';
import BipolarTestPage from './BipolarTestPage';
import { TestResult } from './TestUI';
export default function TestContainerBipolar() {
 const [result, setResult] = useState(null);
 return <div><BipolarTestPage onTestComplete={setResult} /><TestResult result={result} /></div>;
}
