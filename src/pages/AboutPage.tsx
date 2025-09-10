import { Shield, Brain, Zap, Users, CheckCircle, Globe } from 'lucide-react';

const AboutPage = () => {
    const features = [
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: "Security First",
            description: "Automatic security analysis against blocked and malicious extension databases"
        },
        {
            icon: <Brain className="w-8 h-8 text-purple-600" />,
            title: "AI-Powered Analysis",
            description: "Google Gemini AI provides intelligent extension evaluation and recommendations"
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-600" />,
            title: "Real-time Processing",
            description: "Instant analysis with fallback mechanisms and error handling"
        },
        {
            icon: <Users className="w-8 h-8 text-green-600" />,
            title: "User-Friendly",
            description: "Simple form interface with pre-filled test cases for easy testing"
        },
        {
            icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
            title: "Smart Recommendations",
            description: "Alternative extension suggestions based on approved alternatives"
        },
        {
            icon: <Globe className="w-8 h-8 text-red-600" />,
            title: "Extensible Architecture",
            description: "Pluggable AI provider system supporting multiple AI services"
        }
    ];

    const techStack = [
        { name: "React 18", description: "Modern frontend framework with hooks" },
        { name: "TypeScript", description: "Type-safe development experience" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "Google Gemini AI", description: "Advanced language model integration" },
        { name: "Vite", description: "Fast build tool and development server" },
        { name: "React Router", description: "Client-side routing solution" }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    About ExtensionGuard
                </h1>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                    A proof-of-concept application demonstrating intelligent Chrome extension recommendation
                    using GenAI technology. Built to showcase AI-powered security analysis and smart
                    alternative suggestions for enterprise extension management.
                </p>
            </div>

            {/* Features Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center mb-4">
                                {feature.icon}
                                <h3 className="text-xl font-bold text-gray-900 ml-3">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">User Request</h3>
                        <p className="text-sm text-gray-600">Employee submits extension request with details</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Database Check</h3>
                        <p className="text-sm text-gray-600">System checks against approved/blocked lists</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">AI Analysis</h3>
                        <p className="text-sm text-gray-600">Gemini AI evaluates unknown extensions</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">4</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Recommendation</h3>
                        <p className="text-sm text-gray-600">Smart approval/denial with alternatives</p>
                    </div>
                </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Technology Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techStack.map((tech, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.name}</h3>
                            <p className="text-gray-600 text-sm">{tech.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Info */}
            <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Project Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Purpose</h3>
                        <p className="text-gray-600 mb-4">
                            This application serves as a proof-of-concept for enterprise Chrome extension management.
                            It demonstrates how AI can be integrated into security workflows to provide intelligent
                            recommendations and automate approval processes.
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Enterprise extension security management</li>
                            <li>• Automated security analysis workflows</li>
                            <li>• AI-powered alternative recommendations</li>
                            <li>• Policy compliance enforcement</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Development</h3>
                        <p className="text-gray-600 mb-4">
                            Built with modern web technologies and real AI integration. The application features
                            a pluggable AI provider architecture, making it easy to switch between different
                            AI services like Google Gemini, OpenAI, or Claude.
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Future Enhancements</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Database integration for persistent storage</li>
                            <li>• User authentication and role management</li>
                            <li>• Advanced reporting and analytics</li>
                            <li>• Integration with enterprise systems</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
