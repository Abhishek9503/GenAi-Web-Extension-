import React, { useState, useEffect } from 'react';
import { Send, Loader, AlertTriangle, CheckCircle, XCircle, Settings } from 'lucide-react';
import type { ExtensionRequest, AIRecommendation } from '../types';
import { getExtensionStatus, findExtensionById } from '../data/mockData';
import { aiService } from '../services/aiService';
import RecommendationCard from './RecommendationCard';
import AIConfigModal from './AIConfigModal';

interface ExtensionRequestFormProps {
    prefilledData?: Partial<ExtensionRequest>;
}

const ExtensionRequestForm: React.FC<ExtensionRequestFormProps> = ({ prefilledData }) => {
    const [formData, setFormData] = useState<ExtensionRequest>({
        userName: '',
        email: '',
        extensionName: '',
        extensionId: '',
        extensionCategory: '',
        reason: ''
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        status: 'approved' | 'blocked' | 'rejected' | 'ai-analysis';
        message: string;
        aiRecommendation?: AIRecommendation;
    } | null>(null);
    const [showAIConfig, setShowAIConfig] = useState(false);
    const [isAIConfigured, setIsAIConfigured] = useState(false);

    const [errors, setErrors] = useState<Partial<ExtensionRequest>>({});

    // Handle prefilled data
    useEffect(() => {
        if (prefilledData) {
            setFormData(prev => ({
                ...prev,
                ...prefilledData
            }));
            // Clear any previous results when new test case is selected
            setResult(null);
            setErrors({});
        }
    }, [prefilledData]);

    const validateForm = (): boolean => {
        const newErrors: Partial<ExtensionRequest> = {};

        if (!formData.userName.trim()) newErrors.userName = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
        if (!formData.extensionName.trim()) newErrors.extensionName = 'Extension name is required';
        if (!formData.extensionId.trim()) newErrors.extensionId = 'Extension ID is required';
        if (!formData.extensionCategory.trim()) newErrors.extensionCategory = 'Category is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof ExtensionRequest]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Check if AI is configured for new extension analysis
        if (!isAIConfigured && !aiService.currentProvider) {
            setShowAIConfig(true);
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            // Check if extension is in blocked or rejected lists first
            const status = getExtensionStatus(formData.extensionId);

            if (status === 'blocked') {
                const blockedExtension = findExtensionById(formData.extensionId);
                setResult({
                    status: 'blocked',
                    message: `Extension "${formData.extensionName}" is blocked due to security concerns. ${blockedExtension?.description || 'This extension has been flagged as potentially harmful.'}`
                });
                setLoading(false);
                return;
            }

            if (status === 'rejected') {
                const rejectedExtension = findExtensionById(formData.extensionId);
                setResult({
                    status: 'rejected',
                    message: `Extension "${formData.extensionName}" has been previously rejected. ${rejectedExtension?.description || 'This extension does not meet our policy requirements.'}`
                });
                setLoading(false);
                return;
            }

            if (status === 'approved') {
                setResult({
                    status: 'approved',
                    message: `Extension "${formData.extensionName}" is already approved and available for use.`
                });
                setLoading(false);
                return;
            }

            // If status is 'unknown', proceed with AI analysis
            const aiRecommendation = await aiService.analyzeExtensionRequest(
                formData.extensionId,
                formData.extensionName
            );

            setResult({
                status: 'ai-analysis',
                message: 'AI analysis completed. Please review the recommendation below.',
                aiRecommendation
            });

        } catch (error) {
            console.error('Error processing request:', error);
            setResult({
                status: 'rejected',
                message: 'An error occurred while processing your request. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = () => {
        if (!result) return null;

        switch (result.status) {
            case 'approved':
                return <CheckCircle className="w-6 h-6 text-green-500" />;
            case 'blocked':
            case 'rejected':
                return <XCircle className="w-6 h-6 text-red-500" />;
            case 'ai-analysis':
                return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        if (!result) return '';

        switch (result.status) {
            case 'approved':
                return 'border-green-200 bg-green-50';
            case 'blocked':
            case 'rejected':
                return 'border-red-200 bg-red-50';
            case 'ai-analysis':
                return 'border-yellow-200 bg-yellow-50';
            default:
                return '';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-8 animate-fade-in">
            <div className="text-center mb-8 relative">
                <button
                    type="button"
                    onClick={() => setShowAIConfig(true)}
                    className="absolute right-0 top-0 flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    title="Configure AI Settings"
                >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">
                        {isAIConfigured ? 'AI Configured' : 'Configure AI'}
                    </span>
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Chrome Extension Request
                </h1>
                <p className="text-gray-600">
                    Request access to install a new Chrome extension with AI-powered security analysis
                </p>

                {!isAIConfigured && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> AI analysis requires configuration. Click "Configure AI" to set up your API key.
                        </p>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="animate-slide-up animate-delay-1">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.userName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your full name"
                        />
                        {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                    </div>

                    <div className="animate-slide-up animate-delay-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="animate-slide-up animate-delay-3">
                        <label htmlFor="extensionName" className="block text-sm font-medium text-gray-700 mb-2">
                            Extension Name *
                        </label>
                        <input
                            type="text"
                            id="extensionName"
                            name="extensionName"
                            value={formData.extensionName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.extensionName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="e.g., AdBlock Plus"
                        />
                        {errors.extensionName && <p className="text-red-500 text-sm mt-1">{errors.extensionName}</p>}
                    </div>

                    <div className="animate-slide-up animate-delay-4">
                        <label htmlFor="extensionId" className="block text-sm font-medium text-gray-700 mb-2">
                            Extension ID *
                        </label>
                        <input
                            type="text"
                            id="extensionId"
                            name="extensionId"
                            value={formData.extensionId}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.extensionId ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Copy from Chrome Web Store URL"
                        />
                        {errors.extensionId && <p className="text-red-500 text-sm mt-1">{errors.extensionId}</p>}
                    </div>
                </div>

                <div className="animate-slide-up animate-delay-5">
                    <label htmlFor="extensionCategory" className="block text-sm font-medium text-gray-700 mb-2">
                        Extension Category *
                    </label>
                    <select
                        id="extensionCategory"
                        name="extensionCategory"
                        value={formData.extensionCategory}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.extensionCategory ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">Select a category</option>
                        <option value="Privacy & Security">Privacy & Security</option>
                        <option value="Developer Tools">Developer Tools</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Accessibility">Accessibility</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.extensionCategory && <p className="text-red-500 text-sm mt-1">{errors.extensionCategory}</p>}
                </div>

                <div className="animate-slide-up animate-delay-6">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Request (Optional)
                    </label>
                    <textarea
                        id="reason"
                        name="reason"
                        rows={3}
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Explain why you need this extension..."
                    />
                </div>

                <div className="animate-slide-up animate-delay-7">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                <span>Analyzing Extension...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                <span>Submit Request</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {result && (
                <div className={`mt-8 p-6 border rounded-lg ${getStatusColor()} animate-fade-in`}>
                    <div className="flex items-center space-x-3 mb-4">
                        {getStatusIcon()}
                        <h3 className="text-lg font-semibold text-gray-900">
                            Request Status: {result.status.replace('-', ' ').toUpperCase()}
                        </h3>
                    </div>
                    <p className="text-gray-700 mb-4">{result.message}</p>

                    {result.aiRecommendation && (
                        <RecommendationCard recommendation={result.aiRecommendation} />
                    )}
                </div>
            )}

            <AIConfigModal
                isOpen={showAIConfig}
                onClose={() => setShowAIConfig(false)}
                onConfigured={() => {
                    setIsAIConfigured(true);
                    setShowAIConfig(false);
                }}
            />
        </div>
    );
};

export default ExtensionRequestForm;
