import AppFlowDiagram from '../components/AppFlowDiagram';

const FlowPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    📊 Application Flow Diagram
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive overview of how the ExtensionGuard system processes extension requests,
                    from user input to AI-powered recommendations.
                </p>
            </div>

            <AppFlowDiagram />
        </div>
    );
};

export default FlowPage;
