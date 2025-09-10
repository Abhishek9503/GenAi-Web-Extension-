import AIServiceDesign from '../components/AIServiceDesign';

const AIDesignPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    🧠 AI Service Architecture
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Detailed low-level design of the AI service layer, including provider architecture,
                    data flow patterns, and dry-run examples of how the system works.
                </p>
            </div>

            <AIServiceDesign />
        </div>
    );
};

export default AIDesignPage;
