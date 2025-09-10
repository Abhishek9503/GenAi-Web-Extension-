import { useState } from 'react';
import { Play } from 'lucide-react';
import ExtensionRequestForm from '../components/ExtensionRequestForm';
import TestCases, { type TestCase } from '../components/TestCases';
import type { ExtensionRequest } from '../types';

const HomePage = () => {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    🚀 ExtensionGuard AI System
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Intelligent Chrome extension recommendation system powered by GenAI.
                    Request access to extensions and get AI-powered security analysis and recommendations.
                </p>
            </div>

            {/* Testing Instructions */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mx-auto max-w-4xl">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                            🧪 Quick Testing Guide
                        </h3>
                        <p className="text-blue-800 text-sm sm:text-base leading-relaxed">
                            <strong>Click any test case button below</strong> to automatically fill the form with sample data for testing.
                            This allows you to quickly test different scenarios (approved, blocked, or AI analysis) without manually entering information.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full border border-green-300">
                                ✅ Pre-approved Extensions
                            </span>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full border border-red-300">
                                ❌ Blocked Extensions
                            </span>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-300">
                                🤖 AI Analysis Required
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <TestCases onTestCaseSelect={handleTestCaseSelect} />
            <ExtensionRequestForm prefilledData={selectedTestCase} />
        </div>
    );
};

export default HomePage;
