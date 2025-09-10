import type { Extension, AIRecommendation } from '../types';
import { approvedExtensions } from '../data/mockData';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIProvider {
    name: string;
    analyzeExtension: (extensionId: string, extensionName: string) => Promise<Extension>;
    getSimilarExtensions: (extension: Extension) => Promise<Extension[]>;
    getRecommendation: (requestedExtension: Extension, approvedExtensions: Extension[]) => Promise<AIRecommendation['recommendation']>;
}

// Initialize Gemini AI once with environment variable
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export class GeminiAIProvider implements AIProvider {
    name = 'Gemini AI';
    private model: any;

    constructor() {
        this.model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Using flash model for better performance
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500,
            },
        });
    }

    private cleanJsonResponse(text: string): string {
        // Remove markdown code blocks if present
        let cleaned = text.trim();
        if (cleaned.startsWith('```json')) {
            cleaned = cleaned.replace(/^```json\s*/, '');
        }
        if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```\s*/, '');
        }
        if (cleaned.endsWith('```')) {
            cleaned = cleaned.replace(/\s*```$/, '');
        }
        return cleaned.trim();
    }

    async analyzeExtension(extensionId: string, extensionName: string): Promise<Extension> {
        const prompt = `
      Analyze the Chrome extension "${extensionName}" with ID "${extensionId}".
      
      Please provide a detailed analysis in the following JSON format:
      {
        "name": "${extensionName}",
        "category": "one of: Privacy & Security, Developer Tools, Productivity, Shopping, Accessibility, Entertainment, Other",
        "rating": "estimated rating from 1.0 to 5.0 based on typical user feedback",
        "description": "concise description of what this extension does",
        "functionality": "detailed explanation of core features and capabilities",
        "useCase": "primary use cases and target audience",
        "users": "estimated number of users (as integer)",
        "securityRisk": "assessment of potential security risks (low/medium/high)",
        "trustworthiness": "assessment of extension trustworthiness (low/medium/high)"
      }
      
      Base your analysis on:
      1. Extension name patterns and keywords
      2. Common functionality associated with similar extensions
      3. Typical security considerations for this type of extension
      4. Market data for similar extensions
      
      Respond with ONLY the JSON object, no additional text.
    `;

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const result = await this.model.generateContent([{ text: prompt }]);
                const response = await result.response;
                const text = response.text();

                if (!text) throw new Error("Empty response from Gemini API");

                try {
                    const cleanedText = this.cleanJsonResponse(text);
                    const analysisData = JSON.parse(cleanedText);

                    return {
                        id: extensionId,
                        name: analysisData.name || extensionName,
                        category: analysisData.category || 'Other',
                        rating: parseFloat(analysisData.rating) || 3.0,
                        description: analysisData.description || `Extension: ${extensionName}`,
                        functionality: analysisData.functionality || 'Core browser enhancement functionality',
                        useCase: analysisData.useCase || 'General browser enhancement',
                        users: parseInt(analysisData.users) || Math.floor(Math.random() * 1000000) + 100000,
                        lastUpdated: new Date().toISOString().split('T')[0]
                    };
                } catch (parseError) {
                    console.error('Error parsing AI response:', parseError);
                    return this.fallbackAnalysis(extensionId, extensionName);
                }
            } catch (err: any) {
                if (err.status === 429 && attempt < 2) {
                    const retryDelaySec = parseInt(
                        err?.errorDetails?.find((e: any) => e["@type"]?.includes("RetryInfo"))?.retryDelay?.replace(/\D/g, "") || "30"
                    );
                    console.warn(`Gemini quota hit. Retrying in ${retryDelaySec}s...`);
                    await new Promise(res => setTimeout(res, retryDelaySec * 1000));
                    continue;
                }
                console.error("Gemini API error", err);
                if (attempt === 2) {
                    return this.fallbackAnalysis(extensionId, extensionName);
                }
            }
        }

        return this.fallbackAnalysis(extensionId, extensionName);
    }

    private fallbackAnalysis(extensionId: string, extensionName: string): Extension {
        return {
            id: extensionId,
            name: extensionName,
            category: this.predictCategory(extensionName),
            rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
            description: `Chrome extension: ${extensionName}`,
            functionality: `Core functionality of ${extensionName}`,
            useCase: this.predictUseCase(extensionName),
            users: Math.floor(Math.random() * 5000000) + 100000,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
    }

    async getSimilarExtensions(extension: Extension): Promise<Extension[]> {
        const prompt = `
      Find 3-5 similar Chrome extensions to "${extension.name}" in the "${extension.category}" category.
      
      The original extension functionality: ${extension.functionality}
      Use case: ${extension.useCase}
      
      Please provide alternatives in the following JSON format:
      {
        "alternatives": [
          {
            "name": "extension name",
            "category": "${extension.category}",
            "rating": "rating from 1.0 to 5.0",
            "description": "brief description",
            "functionality": "what it does",
            "useCase": "primary use case",
            "users": "estimated user count as integer"
          }
        ]
      }
      
      Focus on:
      1. Popular, well-known alternatives
      2. Extensions with similar functionality
      3. Reputable extensions with good security track records
      4. Extensions that serve the same use case
      
      Respond with ONLY the JSON object, no additional text.
    `;

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const result = await this.model.generateContent([{ text: prompt }]);
                const response = await result.response;
                const text = response.text();

                if (!text) throw new Error("Empty response from Gemini API");

                try {
                    const cleanedText = this.cleanJsonResponse(text);
                    const data = JSON.parse(cleanedText);
                    return data.alternatives.map((alt: any, index: number) => ({
                        id: `similar_${Date.now()}_${index}`,
                        name: alt.name,
                        category: alt.category || extension.category,
                        rating: parseFloat(alt.rating) || 4.0,
                        description: alt.description,
                        functionality: alt.functionality,
                        useCase: alt.useCase,
                        users: parseInt(alt.users) || Math.floor(Math.random() * 1000000) + 100000,
                        lastUpdated: new Date().toISOString().split('T')[0]
                    }));
                } catch (parseError) {
                    console.error('Error parsing similar extensions response:', parseError);
                    return this.fallbackSimilarExtensions(extension);
                }
            } catch (err: any) {
                if (err.status === 429 && attempt < 2) {
                    const retryDelaySec = parseInt(
                        err?.errorDetails?.find((e: any) => e["@type"]?.includes("RetryInfo"))?.retryDelay?.replace(/\D/g, "") || "30"
                    );
                    console.warn(`Gemini quota hit. Retrying in ${retryDelaySec}s...`);
                    await new Promise(res => setTimeout(res, retryDelaySec * 1000));
                    continue;
                }
                console.error("Gemini API error", err);
                if (attempt === 2) {
                    return this.fallbackSimilarExtensions(extension);
                }
            }
        }

        return this.fallbackSimilarExtensions(extension);
    }

    private fallbackSimilarExtensions(extension: Extension): Extension[] {
        return [
            {
                id: `similar1_${Date.now()}`,
                name: `Alternative to ${extension.name}`,
                category: extension.category,
                rating: 4.2,
                description: 'Popular alternative with similar functionality',
                functionality: 'Enhanced version of similar capabilities',
                useCase: extension.useCase,
                users: 750000,
                lastUpdated: '2024-03-01'
            },
            {
                id: `similar2_${Date.now()}`,
                name: `${extension.category} Pro`,
                category: extension.category,
                rating: 4.4,
                description: 'Professional-grade alternative',
                functionality: 'Advanced features for power users',
                useCase: extension.useCase,
                users: 1200000,
                lastUpdated: '2024-02-15'
            }
        ];
    }

    async getRecommendation(requestedExtension: Extension, approvedList: Extension[]): Promise<AIRecommendation['recommendation']> {
        const similarApproved = approvedList.filter(ext =>
            ext.category === requestedExtension.category ||
            ext.functionality.toLowerCase().includes(requestedExtension.name.toLowerCase())
        );

        const prompt = `
      Analyze whether to approve the Chrome extension "${requestedExtension.name}" based on the following criteria:
      
      Extension Details:
      - Name: ${requestedExtension.name}
      - Category: ${requestedExtension.category}
      - Rating: ${requestedExtension.rating}
      - Users: ${requestedExtension.users}
      - Functionality: ${requestedExtension.functionality}
      - Use Case: ${requestedExtension.useCase}
      
      Approved Alternatives Available:
      ${similarApproved.map(ext => `- ${ext.name}: ${ext.description}`).join('\n')}
      
      Security Evaluation Criteria:
      1. Rating should be 4.0+ for approval
      2. User base should be 500,000+ for trust
      3. Extension should not duplicate existing approved functionality
      4. No security red flags in name or functionality
      
      Provide recommendation in JSON format:
      {
        "isApproved": true/false,
        "reason": "detailed explanation of decision",
        "securityConcerns": ["list of any security concerns"],
        "recommendation": "APPROVE/REVIEW/DENY"
      }
      
      Respond with ONLY the JSON object, no additional text.
    `;

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const result = await this.model.generateContent([{ text: prompt }]);
                const response = await result.response;
                const text = response.text();

                if (!text) throw new Error("Empty response from Gemini API");

                try {
                    const cleanedText = this.cleanJsonResponse(text);
                    const recommendation = JSON.parse(cleanedText);

                    return {
                        isApproved: recommendation.isApproved || false,
                        reason: recommendation.reason || 'AI analysis completed',
                        alternativeExtensions: recommendation.isApproved ? [] : similarApproved.slice(0, 3)
                    };
                } catch (parseError) {
                    console.error('Error parsing recommendation response:', parseError);
                    return this.fallbackRecommendation(requestedExtension, similarApproved);
                }
            } catch (err: any) {
                if (err.status === 429 && attempt < 2) {
                    const retryDelaySec = parseInt(
                        err?.errorDetails?.find((e: any) => e["@type"]?.includes("RetryInfo"))?.retryDelay?.replace(/\D/g, "") || "30"
                    );
                    console.warn(`Gemini quota hit. Retrying in ${retryDelaySec}s...`);
                    await new Promise(res => setTimeout(res, retryDelaySec * 1000));
                    continue;
                }
                console.error("Gemini API error", err);
                if (attempt === 2) {
                    return this.fallbackRecommendation(requestedExtension, similarApproved);
                }
            }
        }

        return this.fallbackRecommendation(requestedExtension, similarApproved);
    }

    private fallbackRecommendation(requestedExtension: Extension, similarApproved: Extension[]): AIRecommendation['recommendation'] {
        const hasGoodRating = requestedExtension.rating >= 4.0;
        const hasLargeUserBase = requestedExtension.users >= 500000;
        const hasAlternatives = similarApproved.length > 0;

        const shouldApprove = hasGoodRating && hasLargeUserBase && !hasAlternatives;

        return {
            isApproved: shouldApprove,
            reason: shouldApprove
                ? `${requestedExtension.name} meets security standards with ${requestedExtension.rating}/5 rating and ${requestedExtension.users.toLocaleString()} users.`
                : hasAlternatives
                    ? 'Pre-approved alternatives available that provide similar functionality with verified security.'
                    : `Extension does not meet minimum security criteria (rating: ${requestedExtension.rating}, users: ${requestedExtension.users.toLocaleString()}).`,
            alternativeExtensions: similarApproved.slice(0, 3)
        };
    }

    private predictCategory(extensionName: string): string {
        const name = extensionName.toLowerCase();
        if (name.includes('ad') || name.includes('block') || name.includes('privacy') || name.includes('security')) {
            return 'Privacy & Security';
        }
        if (name.includes('dev') || name.includes('debug') || name.includes('code')) {
            return 'Developer Tools';
        }
        if (name.includes('shop') || name.includes('coupon') || name.includes('deal')) {
            return 'Shopping';
        }
        if (name.includes('productivity') || name.includes('task') || name.includes('manage')) {
            return 'Productivity';
        }
        if (name.includes('dark') || name.includes('theme') || name.includes('accessibility')) {
            return 'Accessibility';
        }
        return 'Other';
    }

    private predictUseCase(extensionName: string): string {
        const category = this.predictCategory(extensionName);
        const useCases = {
            'Privacy & Security': 'Enhance online privacy and security',
            'Developer Tools': 'Improve development workflow and debugging',
            'Shopping': 'Find deals and save money while shopping',
            'Productivity': 'Boost productivity and task management',
            'Accessibility': 'Improve website accessibility and readability',
            'Other': 'General browser enhancement'
        };
        return useCases[category as keyof typeof useCases] || useCases.Other;
    }
}

// OpenAI Provider (placeholder for future implementation)
export class OpenAIProvider implements AIProvider {
    name = 'OpenAI GPT';

    constructor(apiKey: string) {
        console.log(`OpenAI Provider initialized with API key: ${apiKey.substring(0, 8)}...`);
    }

    async analyzeExtension(_extensionId: string, _extensionName: string): Promise<Extension> {
        // TODO: Implement OpenAI API integration
        throw new Error('OpenAI provider not implemented yet. Use Gemini provider.');
    }

    async getSimilarExtensions(_extension: Extension): Promise<Extension[]> {
        throw new Error('OpenAI provider not implemented yet. Use Gemini provider.');
    }

    async getRecommendation(_requestedExtension: Extension, _approvedExtensions: Extension[]): Promise<AIRecommendation['recommendation']> {
        throw new Error('OpenAI provider not implemented yet. Use Gemini provider.');
    }
}

// Factory for creating AI providers
export class AIProviderFactory {
    static createProvider(providerName: string, apiKey: string): AIProvider {
        switch (providerName.toLowerCase()) {
            case 'gemini':
                return new GeminiAIProvider();
            case 'openai':
                return new OpenAIProvider(apiKey);
            default:
                throw new Error(`AI Provider '${providerName}' not found. Available providers: gemini, openai`);
        }
    }

    static getAvailableProviders(): string[] {
        return ['gemini', 'openai'];
    }
}

// Default AI service instance
export const aiService = {
    currentProvider: null as AIProvider | null,

    // Initialize Gemini provider automatically using environment variable
    init() {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (apiKey && apiKey.trim() !== '') {
            this.currentProvider = new GeminiAIProvider();
        } else {
            console.warn('VITE_GEMINI_API_KEY not found in environment variables');
        }
    },

    setProvider(providerName: string, apiKey: string) {
        if (!apiKey || apiKey.trim() === '') {
            throw new Error(`API key is required for ${providerName} provider`);
        }
        this.currentProvider = AIProviderFactory.createProvider(providerName, apiKey);
    },

    async analyzeExtensionRequest(extensionId: string, extensionName: string): Promise<AIRecommendation> {
        // Auto-initialize if not already done
        if (!this.currentProvider) {
            this.init();
        }

        if (!this.currentProvider) {
            throw new Error('AI Provider not configured. Please check your environment variables.');
        }

        const currentExtension = await this.currentProvider.analyzeExtension(extensionId, extensionName);
        const similarExtensions = await this.currentProvider.getSimilarExtensions(currentExtension);
        const recommendation = await this.currentProvider.getRecommendation(currentExtension, approvedExtensions);

        return {
            currentExtension,
            similarExtensions,
            recommendation
        };
    }
};

// Auto-initialize the service
aiService.init();