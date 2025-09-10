import React, { useState } from 'react';
import { X, Key, Settings, AlertCircle } from 'lucide-react';
import { aiService, AIProviderFactory } from '../services/aiService';

interface AIConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfigured: () => void;
}

const AIConfigModal: React.FC<AIConfigModalProps> = ({ isOpen, onClose, onConfigured }) => {
    const [selectedProvider, setSelectedProvider] = useState('gemini');
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const availableProviders = AIProviderFactory.getAvailableProviders();

    const handleSave = async () => {
        if (!apiKey.trim()) {
            setError('API key is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            aiService.setProvider(selectedProvider, apiKey);
            setLoading(false);
            onConfigured();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to configure AI provider');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">AI Configuration</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                            AI Provider
                        </label>
                        <select
                            id="provider"
                            value={selectedProvider}
                            onChange={(e) => setSelectedProvider(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {availableProviders.map(provider => (
                                <option key={provider} value={provider}>
                                    {provider === 'gemini' ? 'Google Gemini AI' : provider.charAt(0).toUpperCase() + provider.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                            API Key
                        </label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                id="apiKey"
                                value={apiKey}
                                onChange={(e) => {
                                    setApiKey(e.target.value);
                                    setError('');
                                }}
                                placeholder={`Enter your ${selectedProvider === 'gemini' ? 'Google AI Studio' : selectedProvider} API key`}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {selectedProvider === 'gemini' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <div className="flex">
                                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Get your Gemini API Key
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ol className="list-decimal list-inside space-y-1">
                                            <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
                                            <li>Sign in with your Google account</li>
                                            <li>Click "Create API key"</li>
                                            <li>Copy and paste the key above</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedProvider === 'openai' && (
                        <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                            <div className="flex">
                                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-orange-800">
                                        OpenAI Provider (Coming Soon)
                                    </h3>
                                    <p className="mt-2 text-sm text-orange-700">
                                        OpenAI integration is not yet implemented. Please use Gemini for now.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                            <div className="flex">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <div className="ml-3">
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading || !apiKey.trim() || selectedProvider === 'openai'}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        <span>{loading ? 'Configuring...' : 'Save Configuration'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIConfigModal;
