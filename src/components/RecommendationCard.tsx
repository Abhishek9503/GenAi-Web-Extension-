import React from 'react';
import { Star, Users, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import type { AIRecommendation, Extension } from '../types';

interface RecommendationCardProps {
    recommendation: AIRecommendation;
}

const ExtensionCard: React.FC<{ extension: Extension; isAlternative?: boolean }> = ({
    extension,
    isAlternative = false
}) => {
    const formatUsers = (users: number): string => {
        if (users >= 1000000) {
            return `${(users / 1000000).toFixed(1)}M`;
        }
        if (users >= 1000) {
            return `${(users / 1000).toFixed(0)}K`;
        }
        return users.toString();
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{extension.name}</h4>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {extension.category}
                    </span>
                </div>
                {isAlternative && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
            </div>

            <p className="text-gray-600 text-sm mb-3">{extension.description}</p>

            <div className="space-y-2 mb-4">
                <div className="text-sm">
                    <span className="font-medium text-gray-700">Functionality:</span>
                    <p className="text-gray-600">{extension.functionality}</p>
                </div>
                <div className="text-sm">
                    <span className="font-medium text-gray-700">Use Case:</span>
                    <p className="text-gray-600">{extension.useCase}</p>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{extension.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{formatUsers(extension.users)}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(extension.lastUpdated).toLocaleDateString()}</span>
                </div>
            </div>

            {isAlternative && (
                <button className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>Use This Alternative</span>
                    <ExternalLink className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
    const { currentExtension, similarExtensions, recommendation: rec } = recommendation;

    return (
        <div className="space-y-6">
            {/* Current Extension Analysis */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <span>Extension Analysis</span>
                </h3>
                <ExtensionCard extension={currentExtension} />
            </div>

            {/* AI Recommendation */}
            <div className={`p-4 rounded-lg border-l-4 ${rec.isApproved
                    ? 'bg-green-50 border-green-400'
                    : 'bg-red-50 border-red-400'
                }`}>
                <div className="flex items-center space-x-2 mb-2">
                    {rec.isApproved ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <h4 className="font-semibold text-gray-900">
                        {rec.isApproved ? 'Recommendation: APPROVE' : 'Recommendation: REVIEW ALTERNATIVES'}
                    </h4>
                </div>
                <p className="text-gray-700">{rec.reason}</p>
            </div>

            {/* Alternative Extensions */}
            {rec.alternativeExtensions.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Approved Alternatives
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rec.alternativeExtensions.map((ext) => (
                            <ExtensionCard key={ext.id} extension={ext} isAlternative={true} />
                        ))}
                    </div>
                </div>
            )}

            {/* Similar Extensions from AI Search */}
            {similarExtensions.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Similar Extensions Found
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {similarExtensions.map((ext) => (
                            <ExtensionCard key={ext.id} extension={ext} />
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm">
                            <strong>Note:</strong> These extensions were found through AI web search.
                            They require additional security review before approval.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecommendationCard;
