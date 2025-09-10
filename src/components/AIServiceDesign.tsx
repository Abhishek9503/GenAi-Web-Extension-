import React, { useState } from 'react';
import {
    Brain,
    Database,
    Layers,
    Code,
    Zap,
    CheckCircle,
    AlertTriangle,
    ChevronDown,
    ChevronRight,
    Globe,
    Shield,
    Star,
    Users
} from 'lucide-react';

const AIServiceDesign: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        architecture: true,
        dryRun: false,
        dataFlow: false
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
                <Brain className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-900">AI Service Architecture & Design</h2>
            </div>

            {/* Architecture Overview */}
            <div className="mb-8">
                <button
                    onClick={() => toggleSection('architecture')}
                    className="flex items-center gap-2 w-full text-left p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                    {expandedSections.architecture ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    <h3 className="text-xl font-bold text-indigo-900">🏗️ Service Architecture</h3>
                </button>

                {expandedSections.architecture && (
                    <div className="mt-4 p-6 border border-indigo-200 rounded-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* AI Provider Layer */}
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Layers className="w-5 h-5 text-purple-600" />
                                    <h4 className="font-bold text-purple-900">AI Provider Layer</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-purple-800">AIProvider Interface</p>
                                        <p className="text-xs text-purple-600">Pluggable architecture</p>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-purple-800">GeminiAIProvider</p>
                                        <p className="text-xs text-purple-600">Current implementation</p>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-purple-800">OpenAIProvider</p>
                                        <p className="text-xs text-purple-600">Future implementation</p>
                                    </div>
                                </div>
                            </div>

                            {/* Service Layer */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Code className="w-5 h-5 text-blue-600" />
                                    <h4 className="font-bold text-blue-900">Service Layer</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-blue-800">AIService</p>
                                        <p className="text-xs text-blue-600">Main orchestrator</p>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-blue-800">analyzeExtensionRequest</p>
                                        <p className="text-xs text-blue-600">Core analysis method</p>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-blue-800">Provider Factory</p>
                                        <p className="text-xs text-blue-600">Dynamic provider creation</p>
                                    </div>
                                </div>
                            </div>

                            {/* Data Layer */}
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Database className="w-5 h-5 text-green-600" />
                                    <h4 className="font-bold text-green-900">Data Layer</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-green-800">Mock Database</p>
                                        <p className="text-xs text-green-600">Extension lists storage</p>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-green-800">Status Checker</p>
                                        <p className="text-xs text-green-600">Quick lookup functions</p>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <p className="font-medium text-green-800">Extension Finder</p>
                                        <p className="text-xs text-green-600">Data retrieval utilities</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Dry Run Example */}
            <div className="mb-8">
                <button
                    onClick={() => toggleSection('dryRun')}
                    className="flex items-center gap-2 w-full text-left p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                    {expandedSections.dryRun ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    <h3 className="text-xl font-bold text-yellow-900">🎯 Dry Run Example: Grammarly Extension Request</h3>
                </button>

                {expandedSections.dryRun && (
                    <div className="mt-4 p-6 border border-yellow-200 rounded-lg">
                        <div className="space-y-6">
                            {/* Input */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-bold text-blue-900 mb-2">📥 Input Data</h4>
                                <div className="bg-white p-3 rounded border font-mono text-sm">
                                    <pre>{`{
  "userName": "John Doe",
  "email": "john.doe@company.com",
  "extensionName": "Grammarly",
  "extensionId": "kbfnbcaeplbcioakkpcpgfkobkghlken",
  "extensionCategory": "Productivity",
  "reason": "Improve writing quality"
}`}</pre>
                                </div>
                            </div>

                            {/* Processing Steps */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-gray-900">Database Check</h5>
                                        <p className="text-sm text-gray-600">Check extension ID against approved, blocked, rejected lists</p>
                                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                            <code>Result: Extension not found in any list → Proceed to AI analysis</code>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">2</span>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-gray-900">AI Extension Analysis</h5>
                                        <p className="text-sm text-gray-600">Gemini AI analyzes extension details</p>
                                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                                            <strong>AI Prompt:</strong> "Analyze Chrome extension 'Grammarly' with ID 'kbfn...'"<br />
                                            <strong>AI Response:</strong> Extension details with rating, users, functionality
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600 font-bold">3</span>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-gray-900">Similar Extensions Search</h5>
                                        <p className="text-sm text-gray-600">Find similar extensions in the same category</p>
                                        <div className="mt-2 p-2 bg-purple-50 rounded text-xs">
                                            <strong>AI Finds:</strong> Language tools, writing assistants, grammar checkers
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                        <span className="text-orange-600 font-bold">4</span>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-gray-900">Final Recommendation</h5>
                                        <p className="text-sm text-gray-600">Compare with approved list and generate recommendation</p>
                                        <div className="mt-2 p-2 bg-orange-50 rounded text-xs">
                                            <strong>Analysis:</strong> No similar approved extensions → Evaluate standalone merit
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Output */}
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-900 mb-2">📤 AI Recommendation Output</h4>
                                <div className="bg-white p-3 rounded border">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-bold text-green-800 mb-2">Extension Analysis</h5>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex justify-between">
                                                    <span>Rating:</span>
                                                    <span className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-yellow-500" />
                                                        4.5/5
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Users:</span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3 h-3 text-blue-500" />
                                                        10M+
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Security:</span>
                                                    <span className="flex items-center gap-1">
                                                        <Shield className="w-3 h-3 text-green-500" />
                                                        Safe
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-green-800 mb-2">Recommendation</h5>
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="font-bold text-green-800">APPROVED</span>
                                            </div>
                                            <p className="text-xs text-green-700">
                                                "High rating, millions of users, legitimate productivity tool.
                                                No security concerns identified."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Data Flow */}
            <div className="mb-8">
                <button
                    onClick={() => toggleSection('dataFlow')}
                    className="flex items-center gap-2 w-full text-left p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                    {expandedSections.dataFlow ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    <h3 className="text-xl font-bold text-green-900">🔄 Data Flow & API Interactions</h3>
                </button>

                {expandedSections.dataFlow && (
                    <div className="mt-4 p-6 border border-green-200 rounded-lg">
                        <div className="space-y-6">
                            {/* Database Query */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Database className="w-5 h-5" />
                                    Database Query Pattern
                                </h4>
                                <div className="space-y-2">
                                    <div className="bg-white p-3 rounded border">
                                        <p className="font-mono text-sm text-gray-800">getExtensionStatus(extensionId: string)</p>
                                        <p className="text-xs text-gray-600 mt-1">Returns: 'approved' | 'blocked' | 'rejected' | 'unknown'</p>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <p className="font-mono text-sm text-gray-800">findExtensionById(extensionId: string)</p>
                                        <p className="text-xs text-gray-600 mt-1">Returns: Extension object or undefined</p>
                                    </div>
                                </div>
                            </div>

                            {/* AI API Calls */}
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    Gemini AI API Integration
                                </h4>
                                <div className="space-y-3">
                                    <div className="bg-white p-3 rounded border">
                                        <h5 className="font-bold text-indigo-800 mb-1">analyzeExtension()</h5>
                                        <p className="text-xs text-indigo-600 mb-2">Analyzes extension details and returns structured data</p>
                                        <div className="bg-indigo-50 p-2 rounded text-xs">
                                            <strong>Input:</strong> Extension name + ID<br />
                                            <strong>Output:</strong> {`{ rating, users, description, functionality, useCase }`}
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded border">
                                        <h5 className="font-bold text-indigo-800 mb-1">getSimilarExtensions()</h5>
                                        <p className="text-xs text-indigo-600 mb-2">Finds similar extensions in the same category</p>
                                        <div className="bg-indigo-50 p-2 rounded text-xs">
                                            <strong>Input:</strong> Extension object<br />
                                            <strong>Output:</strong> Array of similar extensions with details
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded border">
                                        <h5 className="font-bold text-indigo-800 mb-1">getRecommendation()</h5>
                                        <p className="text-xs text-indigo-600 mb-2">Compares with approved list and generates final recommendation</p>
                                        <div className="bg-indigo-50 p-2 rounded text-xs">
                                            <strong>Input:</strong> Extension + approved list<br />
                                            <strong>Output:</strong> {`{ isApproved, reason, alternativeExtensions }`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Error Handling */}
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    Error Handling & Fallbacks
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white p-3 rounded border">
                                        <h5 className="font-bold text-red-800 mb-1">API Rate Limiting</h5>
                                        <p className="text-xs text-red-600">Automatic retry with exponential backoff</p>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <h5 className="font-bold text-red-800 mb-1">JSON Parse Errors</h5>
                                        <p className="text-xs text-red-600">Fallback to default extension analysis</p>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <h5 className="font-bold text-red-800 mb-1">Network Failures</h5>
                                        <p className="text-xs text-red-600">Conservative denial with explanation</p>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <h5 className="font-bold text-red-800 mb-1">Invalid Responses</h5>
                                        <p className="text-xs text-red-600">Markdown cleanup and re-parsing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Provider Switching */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-purple-600" />
                    AI Provider Switching Architecture
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
                        <h4 className="font-bold text-purple-800 mb-2">Current: Gemini AI</h4>
                        <ul className="text-xs text-purple-600 space-y-1">
                            <li>• Google Generative AI SDK</li>
                            <li>• gemini-1.5-flash model</li>
                            <li>• Environment variable config</li>
                            <li>• Retry logic for rate limits</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-2">Future: OpenAI</h4>
                        <ul className="text-xs text-blue-600 space-y-1">
                            <li>• OpenAI SDK integration</li>
                            <li>• GPT-4 model support</li>
                            <li>• Same interface contract</li>
                            <li>• Easy provider switching</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
                        <h4 className="font-bold text-green-800 mb-2">Extensible Design</h4>
                        <ul className="text-xs text-green-600 space-y-1">
                            <li>• AIProvider interface</li>
                            <li>• Factory pattern</li>
                            <li>• Runtime provider selection</li>
                            <li>• Zero code changes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIServiceDesign;
