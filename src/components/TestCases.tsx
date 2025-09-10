import React from 'react';
import { Play, Shield, AlertTriangle, CheckCircle, XCircle, Eye, Code, ShoppingCart, Lock, Zap } from 'lucide-react';

export interface TestCase {
    id: string;
    name: string;
    email: string;
    extensionName: string;
    extensionId: string;
    category: string;
    reason: string;
    expectedResult: 'APPROVED' | 'DENIED' | 'REVIEW';
    description: string;
    icon: React.ReactNode;
    color: string;
}

const testCases: TestCase[] = [
    {
        id: 'approved-ublock',
        name: 'John Doe',
        email: 'john.doe@company.com',
        extensionName: 'uBlock Origin',
        extensionId: 'cjpalhdlnbpafiamejdnhcphjbkeiagm',
        category: 'Privacy & Security',
        reason: 'Need ad blocking for better productivity',
        expectedResult: 'APPROVED',
        description: 'Already approved extension - instant approval',
        icon: <Shield className="w-5 h-5" />,
        color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
        id: 'blocked-suspicious-vpn',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        extensionName: 'Free VPN Super Fast',
        extensionId: 'malicious123456789',
        category: 'Privacy & Security',
        reason: 'Need VPN for remote work',
        expectedResult: 'DENIED',
        description: 'Blocked extension - security concerns',
        icon: <XCircle className="w-5 h-5" />,
        color: 'bg-red-100 border-red-300 text-red-800'
    },
    {
        id: 'ai-grammarly',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        extensionName: 'Grammarly',
        extensionId: 'kbfnbcaeplbcioakkpcpgfkobkghlken',
        category: 'Productivity',
        reason: 'Improve writing quality for documentation',
        expectedResult: 'APPROVED',
        description: 'AI analysis - legitimate, popular extension',
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
        id: 'developer-tools',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        extensionName: 'React Developer Tools',
        extensionId: 'fmkadmapgofadopljbjfkapdkoienihi',
        category: 'Developer Tools',
        reason: 'Debug React applications',
        expectedResult: 'APPROVED',
        description: 'Already approved developer tool',
        icon: <Code className="w-5 h-5" />,
        color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
        id: 'suspicious-download',
        name: 'Tom Brown',
        email: 'tom.brown@company.com',
        extensionName: 'Download Helper Pro',
        extensionId: 'adware987654321',
        category: 'Productivity',
        reason: 'Download files more efficiently',
        expectedResult: 'DENIED',
        description: 'Blocked extension - contains adware',
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'bg-red-100 border-red-300 text-red-800'
    },
    {
        id: 'password-manager',
        name: 'Lisa Davis',
        email: 'lisa.davis@company.com',
        extensionName: 'LastPass',
        extensionId: 'hdokiejnpimakedhajhdlcegeplioahd',
        category: 'Privacy & Security',
        reason: 'Secure password management',
        expectedResult: 'APPROVED',
        description: 'AI analysis - similar to approved Bitwarden',
        icon: <Lock className="w-5 h-5" />,
        color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
        id: 'shopping-honey',
        name: 'Alex Chen',
        email: 'alex.chen@company.com',
        extensionName: 'Honey',
        extensionId: 'bmnlcjabgnpnenekpadlanbbkooimhnj',
        category: 'Shopping',
        reason: 'Save money on company purchases',
        expectedResult: 'APPROVED',
        description: 'Already approved shopping extension',
        icon: <ShoppingCart className="w-5 h-5" />,
        color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
        id: 'gaming-rejected',
        name: 'Chris Lee',
        email: 'chris.lee@company.com',
        extensionName: 'Ultimate Game Cheats',
        extensionId: 'gaming123456789',
        category: 'Entertainment',
        reason: 'Gaming during break time',
        expectedResult: 'DENIED',
        description: 'Rejected extension - violates game policies',
        icon: <XCircle className="w-5 h-5" />,
        color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
        id: 'metamask-crypto',
        name: 'David Park',
        email: 'david.park@company.com',
        extensionName: 'MetaMask',
        extensionId: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
        category: 'Privacy & Security',
        reason: 'Web3 development and testing',
        expectedResult: 'REVIEW',
        description: 'AI analysis - legitimate but needs policy review',
        icon: <Eye className="w-5 h-5" />,
        color: 'bg-orange-100 border-orange-300 text-orange-800'
    },
    {
        id: 'privacy-dark-reader',
        name: 'Emma Taylor',
        email: 'emma.taylor@company.com',
        extensionName: 'Dark Reader',
        extensionId: 'eimadpbcbfnmbkopoojfekhnkhdbieeh',
        category: 'Accessibility',
        reason: 'Reduce eye strain during long work hours',
        expectedResult: 'APPROVED',
        description: 'Already approved accessibility tool',
        icon: <Zap className="w-5 h-5" />,
        color: 'bg-green-100 border-green-300 text-green-800'
    }
];

interface TestCasesProps {
    onTestCaseSelect: (testCase: TestCase) => void;
}

export default function TestCases({ onTestCaseSelect }: TestCasesProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <Play className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Quick Test Cases</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Click to auto-fill form
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {testCases.map((testCase) => (
                    <button
                        key={testCase.id}
                        onClick={() => onTestCaseSelect(testCase)}
                        className={`
              p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md
              text-left cursor-pointer
              ${testCase.color}
            `}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {testCase.icon}
                            <span className="font-semibold text-sm">
                                {testCase.expectedResult}
                            </span>
                        </div>

                        <h3 className="font-bold text-sm mb-1 line-clamp-1">
                            {testCase.extensionName}
                        </h3>

                        <p className="text-xs opacity-80 mb-2 line-clamp-2">
                            {testCase.description}
                        </p>

                        <div className="text-xs opacity-70">
                            <div className="mb-1">
                                <span className="font-medium">User:</span> {testCase.name}
                            </div>
                            <div>
                                <span className="font-medium">Category:</span> {testCase.category}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Legend:</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Already Approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>AI Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Blocked/Denied</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>Needs Review</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
