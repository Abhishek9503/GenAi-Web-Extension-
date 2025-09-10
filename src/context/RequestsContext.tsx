import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ExtensionRequest, AIRecommendation } from '../types';

export interface ExtensionRequestWithResult extends ExtensionRequest {
    id: string;
    timestamp: string;
    status: 'approved' | 'blocked' | 'rejected' | 'ai-analysis' | 'pending';
    aiRecommendation?: AIRecommendation;
    message: string;
}

interface RequestsContextType {
    requests: ExtensionRequestWithResult[];
    addRequest: (request: ExtensionRequest, result: {
        status: 'approved' | 'blocked' | 'rejected' | 'ai-analysis';
        message: string;
        aiRecommendation?: AIRecommendation;
    }) => void;
    updateRequestStatus: (id: string, status: 'approved' | 'rejected', adminNotes?: string) => void;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export const useRequests = () => {
    const context = useContext(RequestsContext);
    if (!context) {
        throw new Error('useRequests must be used within a RequestsProvider');
    }
    return context;
};

interface RequestsProviderProps {
    children: ReactNode;
}

export const RequestsProvider: React.FC<RequestsProviderProps> = ({ children }) => {
    const [requests, setRequests] = useState<ExtensionRequestWithResult[]>([]);

    const addRequest = (
        request: ExtensionRequest,
        result: {
            status: 'approved' | 'blocked' | 'rejected' | 'ai-analysis';
            message: string;
            aiRecommendation?: AIRecommendation;
        }
    ) => {
        const newRequest: ExtensionRequestWithResult = {
            ...request,
            id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            status: result.status,
            message: result.message,
            aiRecommendation: result.aiRecommendation
        };

        setRequests(prev => [newRequest, ...prev]);
    };

    const updateRequestStatus = (id: string, status: 'approved' | 'rejected', adminNotes?: string) => {
        setRequests(prev => prev.map(request =>
            request.id === id
                ? {
                    ...request,
                    status,
                    message: adminNotes || request.message,
                    timestamp: new Date().toISOString()
                }
                : request
        ));
    };

    return (
        <RequestsContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
            {children}
        </RequestsContext.Provider>
    );
};
