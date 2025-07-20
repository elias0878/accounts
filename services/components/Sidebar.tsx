import React from 'react';
import type { MainCategory } from '../types';
import { MenuIcon, XIcon, ShieldIcon } from './icons/Icons';


interface SidebarProps {
    categories: MainCategory[];
    activeCategoryKey: string | null;
    onSelectCategory: (key: string) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategoryKey, onSelectCategory, isSidebarOpen, setSidebarOpen }) => {
    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-gray-700">
                 <div className="flex items-center gap-2">
                    <ShieldIcon />
                    <h1 className="text-xl font-bold text-white">الدرع الرقمي</h1>
                </div>
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-300 hover:text-white"
                    aria-label="Toggle menu"
                >
                    {isSidebarOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </header>
            
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                 <div
                    className="fixed inset-0 bg-black/60 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 bottom-0 z-40 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:relative w-72 bg-gray-900/70 backdrop-blur-md text-gray-300 p-6 shadow-2xl border-l-2 border-gray-800 flex-shrink-0 flex flex-col`}>
                <div className="hidden md:flex flex-col items-center text-center mb-8">
                    <ShieldIcon size={48} />
                    <h2 className="text-2xl font-extrabold mt-3 text-white">الدرع الرقمي</h2>
                    <p className="text-sm text-gray-400">خدمات الأمن السيبراني</p>
                </div>
                <nav id="main-categories" className="overflow-y-auto flex-1">
                    {categories.map(category => {
                        const isActive = activeCategoryKey === category.key;
                        return (
                            <button
                                key={category.key}
                                onClick={() => onSelectCategory(category.key)}
                                className={`w-full text-right py-3 px-4 rounded-lg mb-3 font-semibold text-lg flex items-center transition-all duration-300 border-r-4 ${isActive ? 'bg-gradient-to-r from-blue-900/50 to-blue-900/20 border-blue-500 text-white shadow-inner' : 'border-transparent hover:bg-gray-700/50 hover:border-blue-400'}`}
                            >
                                <span className={`ml-4 text-2xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};
