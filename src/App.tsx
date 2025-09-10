import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import FlowPage from './pages/FlowPage';
import AIDesignPage from './pages/AIDesignPage';
import AboutPage from './pages/AboutPage';
import { RequestsProvider } from './context/RequestsContext';

function App() {
  return (
    <RequestsProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 scroll-smooth">
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/flow" element={<FlowPage />} />
              <Route path="/ai-design" element={<AIDesignPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/60 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-slate-600 font-medium">
                  © 2024 ExtensionGuard. Powered by AI for intelligent extension security analysis.
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  This is a proof-of-concept application demonstrating AI-powered Chrome extension recommendations.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </RequestsProvider>
  );
}

export default App;
