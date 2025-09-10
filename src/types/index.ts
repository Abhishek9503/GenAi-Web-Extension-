export interface Extension {
    id: string;
    name: string;
    category: string;
    rating: number;
    description: string;
    functionality: string;
    useCase: string;
    users: number;
    lastUpdated: string;
}

export interface ExtensionRequest {
    userName: string;
    email: string;
    extensionName: string;
    extensionId: string;
    extensionCategory: string;
    reason?: string;
}

export interface AIRecommendation {
    currentExtension: Extension;
    similarExtensions: Extension[];
    recommendation: {
        isApproved: boolean;
        reason: string;
        alternativeExtensions: Extension[];
    };
}

export type ExtensionStatus = 'approved' | 'blocked' | 'rejected';
