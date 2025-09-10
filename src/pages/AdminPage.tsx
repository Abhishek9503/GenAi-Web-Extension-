import { useState } from 'react';
import {
    Shield,
    User,
    Mail,
    Calendar,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Clock,
    Brain,
    Star,
    Users,
    Globe,
    Filter,
    Search
} from 'lucide-react';
import { useRequests } from '../context/RequestsContext';
import type { ExtensionRequestWithResult } from '../context/RequestsContext';

const AdminPage = () => {
    const { requests, updateRequestStatus } = useRequests();
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRequests = requests.filter(request => {
        const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
        const matchesSearch = searchTerm === '' ||
            request.extensionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.email.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'blocked':
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'ai-analysis':
                return <Brain className="w-5 h-5 text-blue-600" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            default:
                return <AlertTriangle className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'blocked':
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'ai-analysis':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const handleApprove = (requestId: string, adminNotes?: string) => {
        updateRequestStatus(requestId, 'approved', adminNotes || 'Approved by admin after review');
    };

    const handleReject = (requestId: string, adminNotes?: string) => {
        updateRequestStatus(requestId, 'rejected', adminNotes || 'Rejected by admin after review');
    };

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    const getRiskLevel = (request: ExtensionRequestWithResult) => {
        if (request.status === 'blocked') return { level: 'High', color: 'text-red-600' };
        if (request.status === 'rejected') return { level: 'High', color: 'text-red-600' };
        if (request.aiRecommendation && !request.aiRecommendation.recommendation.isApproved) {
            return { level: 'Medium', color: 'text-yellow-600' };
        }
        if (request.status === 'approved') return { level: 'Low', color: 'text-green-600' };
        return { level: 'Unknown', color: 'text-gray-600' };
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
                <p className="text-xl text-gray-600">
                    Review and manage Chrome extension requests with AI-powered risk analysis
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Globe className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">{requests.length}</h3>
                            <p className="text-sm text-gray-600">Total Requests</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {requests.filter(r => r.status === 'approved').length}
                            </h3>
                            <p className="text-sm text-gray-600">Approved</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {requests.filter(r => r.status === 'blocked' || r.status === 'rejected').length}
                            </h3>
                            <p className="text-sm text-gray-600">Blocked/Rejected</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Brain className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {requests.filter(r => r.status === 'ai-analysis').length}
                            </h3>
                            <p className="text-sm text-gray-600">AI Analyzed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by extension name, user, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            aria-label="Filter by status"
                        >
                            <option value="all">All Statuses</option>
                            <option value="approved">Approved</option>
                            <option value="blocked">Blocked</option>
                            <option value="rejected">Rejected</option>
                            <option value="ai-analysis">AI Analysis</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-6">
                {filteredRequests.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Extension Requests</h3>
                        <p className="text-gray-600">
                            {requests.length === 0
                                ? "No extension requests have been submitted yet."
                                : "No requests match your current filters."}
                        </p>
                    </div>
                ) : (
                    filteredRequests.map((request) => {
                        const risk = getRiskLevel(request);

                        return (
                            <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(request.status)}
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{request.extensionName}</h3>
                                                <p className="text-sm text-gray-600">ID: {request.extensionId}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Risk Level</p>
                                                <p className={`font-bold ${risk.color}`}>{risk.level}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                                                {request.status.replace('-', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{request.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{request.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{formatTimestamp(request.timestamp)}</span>
                                        </div>
                                    </div>

                                    {/* Request Details */}
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Request Details</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Category: <span className="font-medium">{request.extensionCategory}</span></p>
                                                <p className="text-sm text-gray-600 mt-1">Reason: <span className="font-medium">{request.reason}</span></p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Status: <span className="font-medium">{request.message}</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Analysis */}
                                    {request.aiRecommendation && (
                                        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                                <Brain className="w-5 h-5" />
                                                AI Risk Analysis
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                {/* Extension Analysis */}
                                                <div>
                                                    <h5 className="font-medium text-blue-800 mb-2">Extension Details</h5>
                                                    <div className="space-y-1 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-500" />
                                                            <span>Rating: {request.aiRecommendation.currentExtension.rating}/5</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4 text-blue-500" />
                                                            <span>Users: {request.aiRecommendation.currentExtension.users.toLocaleString()}</span>
                                                        </div>
                                                        <p className="text-blue-700">
                                                            <strong>Use Case:</strong> {request.aiRecommendation.currentExtension.useCase}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* AI Recommendation */}
                                                <div>
                                                    <h5 className="font-medium text-blue-800 mb-2">AI Recommendation</h5>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {request.aiRecommendation.recommendation.isApproved ? (
                                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-red-600" />
                                                        )}
                                                        <span className={`font-bold ${request.aiRecommendation.recommendation.isApproved
                                                                ? 'text-green-600'
                                                                : 'text-red-600'
                                                            }`}>
                                                            {request.aiRecommendation.recommendation.isApproved ? 'APPROVE' : 'DENY'}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-blue-700">
                                                        {request.aiRecommendation.recommendation.reason}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Alternative Extensions */}
                                            {request.aiRecommendation.recommendation.alternativeExtensions.length > 0 && (
                                                <div>
                                                    <h5 className="font-medium text-blue-800 mb-2">Recommended Alternatives</h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {request.aiRecommendation.recommendation.alternativeExtensions.slice(0, 4).map((alt, index) => (
                                                            <div key={index} className="text-xs bg-white p-2 rounded border">
                                                                <p className="font-medium text-blue-900">{alt.name}</p>
                                                                <p className="text-blue-700">{alt.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Admin Actions */}
                                    {(request.status === 'ai-analysis' || request.status === 'pending') && (
                                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={() => handleApprove(request.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(request.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AdminPage;
