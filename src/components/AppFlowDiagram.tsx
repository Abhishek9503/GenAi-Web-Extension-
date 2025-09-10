import React from 'react';
import {
    User,
    FormInput,
    Database,
    Brain,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Search,
    ArrowDown,
    Shield,
    Cpu
} from 'lucide-react';

const AppFlowDiagram: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900">ExtensionGuard Application Flow</h2>
            </div>

            <div className="space-y-8">
                {/* Step 1: User Request */}
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">1. User Extension Request</h3>
                        <p className="text-gray-600 mb-2">User wants to install a Chrome extension but it's blocked by company policy</p>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Input:</strong> Extension ID from Chrome Web Store URL → User fills form with Name, Email, Extension Name, ID, Category
                            </p>
                        </div>
                    </div>
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                </div>

                {/* Step 2: Form Submission */}
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <FormInput className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">2. Form Data Processing</h3>
                        <p className="text-gray-600 mb-2">System receives extension request and begins analysis</p>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-800">
                                <strong>Data:</strong> {`{ name, email, extensionName, extensionId, category, reason }`}
                            </p>
                        </div>
                    </div>
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                </div>

                {/* Step 3: Database Check */}
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Database className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">3. Database Validation</h3>
                        <p className="text-gray-600 mb-2">Check against existing extension lists</p>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-red-50 p-2 rounded text-center">
                                <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                                <p className="text-xs text-red-800 font-medium">Blocked List</p>
                                <p className="text-xs text-red-600">10 Extensions</p>
                            </div>
                            <div className="bg-green-50 p-2 rounded text-center">
                                <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                <p className="text-xs text-green-800 font-medium">Approved List</p>
                                <p className="text-xs text-green-600">5 Extensions</p>
                            </div>
                            <div className="bg-yellow-50 p-2 rounded text-center">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                                <p className="text-xs text-yellow-800 font-medium">Rejected List</p>
                                <p className="text-xs text-yellow-600">2 Extensions</p>
                            </div>
                        </div>
                    </div>
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                </div>

                {/* Decision Branch */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Decision Branch</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Known Extension */}
                        <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-bold text-red-700 mb-2">If Extension Found in Lists</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <XCircle className="w-4 h-4 text-red-500" />
                                    <span>Blocked → Immediate Denial</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Approved → Immediate Approval</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    <span>Rejected → Denial with Reason</span>
                                </div>
                            </div>
                        </div>

                        {/* Unknown Extension */}
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-bold text-blue-700 mb-2">If Extension Unknown</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-blue-500" />
                                    <span>Trigger AI Analysis</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Search className="w-4 h-4 text-blue-500" />
                                    <span>Web Crawling & Research</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-blue-500" />
                                    <span>Security Assessment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 4: AI Analysis */}
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                            <Brain className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">4. Gemini AI Analysis (Unknown Extensions)</h3>
                        <p className="text-gray-600 mb-2">AI performs comprehensive extension analysis</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-purple-50 p-3 rounded-lg">
                                <h4 className="font-bold text-purple-800 mb-2">Phase 1: Extension Research</h4>
                                <ul className="text-xs text-purple-700 space-y-1">
                                    <li>• Web crawling for extension details</li>
                                    <li>• Rating & user count analysis</li>
                                    <li>• Functionality assessment</li>
                                    <li>• Security evaluation</li>
                                </ul>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                                <h4 className="font-bold text-purple-800 mb-2">Phase 2: Similar Extensions</h4>
                                <ul className="text-xs text-purple-700 space-y-1">
                                    <li>• Find 5 similar extensions</li>
                                    <li>• Compare with approved list</li>
                                    <li>• Generate recommendations</li>
                                    <li>• Risk assessment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                </div>

                {/* Step 5: Final Recommendation */}
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Shield className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">5. Final Recommendation</h3>
                        <p className="text-gray-600 mb-2">AI compares with approved extensions and provides recommendation</p>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                            <p className="text-sm text-indigo-800 mb-2">
                                <strong>AI Output:</strong> Extension analysis + Alternative suggestions
                            </p>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="bg-green-100 p-2 rounded text-center">
                                    <p className="font-bold text-green-800">APPROVE</p>
                                    <p className="text-green-600">Safe & Useful</p>
                                </div>
                                <div className="bg-red-100 p-2 rounded text-center">
                                    <p className="font-bold text-red-800">DENY</p>
                                    <p className="text-red-600">Security Risk</p>
                                </div>
                                <div className="bg-yellow-100 p-2 rounded text-center">
                                    <p className="font-bold text-yellow-800">REVIEW</p>
                                    <p className="text-yellow-600">Manual Check</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technology Stack */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Technology Stack</h3>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <h4 className="font-bold text-blue-600 mb-1">Frontend</h4>
                            <p className="text-xs text-gray-600">React + TypeScript</p>
                            <p className="text-xs text-gray-600">Tailwind CSS</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <h4 className="font-bold text-green-600 mb-1">Data Layer</h4>
                            <p className="text-xs text-gray-600">Mock Database</p>
                            <p className="text-xs text-gray-600">JSON Objects</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <h4 className="font-bold text-purple-600 mb-1">AI Service</h4>
                            <p className="text-xs text-gray-600">Google Gemini</p>
                            <p className="text-xs text-gray-600">Pluggable Architecture</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <h4 className="font-bold text-orange-600 mb-1">Build Tool</h4>
                            <p className="text-xs text-gray-600">Vite</p>
                            <p className="text-xs text-gray-600">Hot Reload</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppFlowDiagram;
