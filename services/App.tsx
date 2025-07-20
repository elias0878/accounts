
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { servicesData } from './data/services';
import type { MainCategory, SubCategory, Service } from './types';

const App: React.FC = () => {
    const [currentMainCategoryKey, setCurrentMainCategoryKey] = useState<string | null>(null);
    const [currentSubCategoryKey, setCurrentSubCategoryKey] = useState<string | null>(null);
    const [currentServiceKey, setCurrentServiceKey] = useState<string | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleMainCategorySelect = useCallback((key: string) => {
        setCurrentMainCategoryKey(key);
        setCurrentSubCategoryKey(null);
        setCurrentServiceKey(null);
        setSidebarOpen(false); // Close sidebar on selection in mobile
    }, []);

    const handleSubCategorySelect = useCallback((mainKey: string, subKey: string) => {
        setCurrentMainCategoryKey(mainKey);
        setCurrentSubCategoryKey(subKey);
        setCurrentServiceKey(null);
    }, []);

    const handleServiceSelect = useCallback((mainKey: string, subKey: string, serviceKey: string) => {
        setCurrentMainCategoryKey(mainKey);
        setCurrentSubCategoryKey(subKey);
        setCurrentServiceKey(serviceKey);
    }, []);

    const handleBack = useCallback(() => {
        if (currentServiceKey) {
            setCurrentServiceKey(null);
        } else if (currentSubCategoryKey) {
            setCurrentSubCategoryKey(null);
        }
    }, [currentServiceKey, currentSubCategoryKey]);

    const mainCategories: MainCategory[] = Object.entries(servicesData).map(([key, value]) => ({
        key,
        name: value.name,
        icon: value.icon,
    }));

    const currentMainCategory = currentMainCategoryKey ? servicesData[currentMainCategoryKey] : null;
    const currentSubCategory = currentMainCategory && currentSubCategoryKey ? currentMainCategory.subCategories[currentSubCategoryKey] : null;
    const currentService = currentSubCategory && currentServiceKey ? currentSubCategory.services[currentServiceKey] : null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-900/50 text-gray-300">
            <ParticleBackground />
            <div className="flex flex-1 flex-col md:flex-row min-h-0">
                <Sidebar
                    categories={mainCategories}
                    activeCategoryKey={currentMainCategoryKey}
                    onSelectCategory={handleMainCategorySelect}
                    isSidebarOpen={isSidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <MainContent
                    mainCategory={currentMainCategory}
                    subCategory={currentSubCategory}
                    service={currentService}
                    onSubCategorySelect={handleSubCategorySelect}
                    onServiceSelect={handleServiceSelect}
                    onBack={handleBack}
                    mainCategoryKey={currentMainCategoryKey}
                    subCategoryKey={currentSubCategoryKey}
                />
            </div>
            <Footer />
        </div>
    );
};

export default App;
