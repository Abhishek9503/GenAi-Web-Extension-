import { useState } from 'react';
import Navbar from './components/Navbar';
import ExtensionRequestForm from './components/ExtensionRequestForm';
import TestCases, { type TestCase } from './components/TestCases';
import AppFlowDiagram from './components/AppFlowDiagram';
import AIServiceDesign from './components/AIServiceDesign';
import type { ExtensionRequest } from './types';

function App() {
  const [selectedTestCase, setSelectedTestCase] = useState<Partial<ExtensionRequest> | undefined>();

  const handleTestCaseSelect = (testCase: TestCase) => {
    setSelectedTestCase({
      userName: testCase.name,
      email: testCase.email,
      extensionName: testCase.extensionName,
      extensionId: testCase.extensionId,
      extensionCategory: testCase.category,
      reason: testCase.reason
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppFlowDiagram />
          <AIServiceDesign />
          <TestCases onTestCaseSelect={handleTestCaseSelect} />
          <ExtensionRequestForm prefilledData={selectedTestCase} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 ExtensionGuard. Powered by AI for intelligent extension security analysis.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This is a proof-of-concept application demonstrating AI-powered Chrome extension recommendations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
