import React from 'react';
import { Shield, Settings, Home } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Shield className="w-8 h-8 text-white" />
                            <span className="text-white text-xl font-bold">ExtensionGuard</span>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <button className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </button>
                            <button className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                                <Settings className="w-4 h-4" />
                                <span>Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
