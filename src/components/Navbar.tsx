import React, { useState } from 'react';
import { Shield, Home, GitBranch, Brain, Info, Settings, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/admin', icon: Settings, label: 'Admin' },
        { path: '/flow', icon: GitBranch, label: 'App Flow' },
        { path: '/ai-design', icon: Brain, label: 'AI Design' },
        { path: '/about', icon: Info, label: 'About' }
    ];

    const isActive = (path: string) => location.pathname === path;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-xl border-b border-slate-600/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group"
                    >
                        <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                            ExtensionGuard
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                                        relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                                        flex items-center space-x-2 min-w-0 whitespace-nowrap
                                        ${active
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }
                                        before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
                                        before:from-blue-600 before:to-indigo-600 before:opacity-0 before:transition-opacity before:duration-300
                                        hover:before:opacity-10
                                    `}
                                >
                                    <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                                    <span className="relative z-10">{item.label}</span>
                                    {active && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 backdrop-blur-sm rounded-lg mt-2 mb-4 border border-slate-600/30 shadow-xl">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`
                                            flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium 
                                            transition-all duration-300 w-full
                                            ${active
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }
                                        `}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span>{item.label}</span>
                                        {active && (
                                            <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
