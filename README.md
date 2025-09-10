# ExtensionGuard - AI-Powered Chrome Extension Request System

A comprehensive proof-of-concept application that demonstrates intelligent Chrome extension recommendations using GenAI technology.

## 🚀 Features

### Core Functionality
- **Smart Extension Analysis**: AI-powered analysis of Chrome extensions using web crawling and data aggregation
- **Security Assessment**: Automatic checking against blocked and rejected extension databases
- **Intelligent Recommendations**: AI-driven suggestions for alternative approved extensions
- **Multi-Provider AI Support**: Configurable AI providers (Gemini AI, with support for OpenAI, Claude, etc.)

### User Interface
- **Modern React Frontend**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-friendly interface with smooth animations
- **Interactive Forms**: Real-time validation and user feedback
- **Rich Cards**: Detailed extension information with ratings, user counts, and functionality descriptions

### AI Integration
- **Extension Analysis**: Automatic categorization, rating analysis, and functionality assessment
- **Similar Extension Discovery**: AI-powered search for alternative extensions
- **Smart Recommendations**: Context-aware suggestions based on approved extension database
- **Configurable Providers**: Easy switching between different AI services

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini AI (configurable for other providers)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations

## 📋 Prerequisites

- Node.js 20.19+ or 22.12+ (Note: Current Node.js version may need updating)
- npm or yarn package manager
- **Gemini API Key** from [Google AI Studio](https://ai.google.dev/)

## 🔧 Installation & Setup

1. **Clone or download the project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API Key**:
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

**Note**: If you encounter Node.js version issues, please update to Node.js 20.19+ or 22.12+

## 🧪 Testing the AI Integration

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing scenarios.

### Quick Test Examples:

**✅ Test APPROVED Extension:**
- Extension Name: `uBlock Origin`
- Extension ID: `cjpalhdlnbpafiamejdnhcphjbkeiagm`
- Category: `Privacy & Security`
- Expected: Should be approved (already in approved list)

**❌ Test BLOCKED Extension:**
- Extension Name: `Free VPN Super Fast`
- Extension ID: `malicious123456789`
- Category: `Privacy & Security`
- Expected: Should be denied (security concerns)

**🤖 Test AI ANALYSIS:**
- Extension Name: `Grammarly`
- Extension ID: `kbfnbcaeplbcioakkpcpgfkobkghlhen`
- Category: `Productivity`
- Expected: Should be approved by AI (high rating, millions of users)

## 🎯 Usage

### For End Users
1. **Fill out the extension request form** with:
   - Your name and email
   - Extension name and ID (from Chrome Web Store URL)
   - Extension category
   - Optional reason for the request

2. **Submit the request** and wait for AI analysis

3. **Review the recommendation** including:
   - Extension security assessment
   - Alternative approved extensions
   - Similar extensions found via AI search

### For Administrators
The system automatically:
- Checks against blocked/rejected extension databases
- Performs AI analysis for unknown extensions
- Provides intelligent recommendations based on security and policy criteria

## 🧠 AI Provider Configuration

The application now uses **real Gemini AI integration** with the following features:

### Current AI Capabilities:
- **Extension Analysis**: Real-time analysis using Gemini 1.5 Flash model
- **Security Assessment**: AI-powered security evaluation
- **Alternative Discovery**: Intelligent suggestions for approved alternatives
- **Rate Limiting Handling**: Automatic retry logic for API limits
- **Error Recovery**: Fallback mechanisms for API failures

### Environment Setup:
```bash
# Required environment variable
VITE_GEMINI_API_KEY=your_gemini_api_key_from_ai_google_dev
```

### AI Provider Factory:
```typescript
// Current implementation uses environment variables
const aiService = new AIService();
aiService.setProvider('gemini', apiKey); // API key from .env
```

### Adding New Providers:
Extend the `AIProvider` interface to add support for additional AI services:
```typescript
class CustomAIProvider implements AIProvider {
  name: string;
  analyzeExtension(extensionId: string, extensionName: string): Promise<Extension>;
  getSimilarExtensions(extension: Extension): Promise<Extension[]>;
  getRecommendation(requested: Extension, approved: Extension[]): Promise<AIRecommendation>;
}
```

## 📊 Mock Data Structure

The application includes three main data categories:

### Approved Extensions
- Pre-verified and safe extensions
- Used for alternative recommendations

### Blocked Extensions
- Extensions flagged for security concerns
- Automatically rejected requests

### Rejected Extensions
- Extensions that don't meet policy requirements
- Previously denied requests

## 🔒 Security Features

- **Automated Security Checks**: Cross-reference against known malicious extensions
- **AI-Powered Analysis**: Real-time assessment of extension safety and functionality
- **Policy Compliance**: Automatic enforcement of organizational extension policies
- **Alternative Suggestions**: Safe alternatives for blocked or rejected extensions

## 🎨 UI/UX Features

- **Smooth Animations**: Tailwind CSS-powered animations for better user experience
- **Progressive Disclosure**: Step-by-step information revelation
- **Status Indicators**: Clear visual feedback for request status
- **Responsive Cards**: Rich information display with extension details
- **Loading States**: Informative loading indicators during AI analysis

## 🚀 Production Considerations

### Current Production Features:
- ✅ **Real AI Integration**: Connected to Gemini AI with proper error handling
- ✅ **Environment Variables**: Secure API key management via .env
- ✅ **Rate Limiting**: Automatic retry logic for API quotas
- ✅ **Error Handling**: Comprehensive fallback mechanisms
- ✅ **JSON Parsing**: Robust handling of AI response formats

### Additional Production Requirements:
1. **Database Integration**: Replace mock data with real database (PostgreSQL/MongoDB)
2. **Authentication**: Add user authentication and session management
3. **Logging**: Implement structured logging (Winston/Pino)
4. **Monitoring**: Add APM tools (New Relic, DataDog)
5. **Security**: HTTPS, input sanitization, CORS configuration
6. **Caching**: Redis for AI response caching
7. **CI/CD**: Automated testing and deployment pipelines

## 📝 Development Notes

- The current implementation uses mock data and simulated AI responses
- Real AI integration would require proper API keys and error handling
- The system is designed to be easily extensible with new AI providers
- All animations and UI components are built with accessibility in mind

## 🤝 Contributing

This is a proof-of-concept application. To extend it:

1. Add new AI providers in `src/services/aiService.ts`
2. Extend the mock data in `src/data/mockData.ts`
3. Enhance the UI components in `src/components/`
4. Add new extension categories or analysis criteria

## 📄 License

This project is for demonstration purposes. Please ensure you have proper licensing for any AI services used in production.
