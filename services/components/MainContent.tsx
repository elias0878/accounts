import React from 'react';
import type { MainCategoryData, SubCategory, Service } from '../types';
import { SubCategoryGrid } from './SubCategoryGrid';
import { ServiceGrid } from './ServiceGrid';
import { ServiceDetails } from './ServiceDetails';
import { WelcomeIllustration } from './icons/Icons';

interface MainContentProps {
    mainCategory: MainCategoryData | null;
    subCategory: Omit<SubCategory, 'key'> | null;
    service: Service | null;
    onSubCategorySelect: (mainKey: string, subKey: string) => void;
    onServiceSelect: (mainKey: string, subKey: string, serviceKey: string) => void;
    onBack: () => void;
    mainCategoryKey: string | null;
    subCategoryKey: string | null;
}

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white pb-4">
            {children}
        </h1>
        <div className="absolute bottom-0 right-0 h-1 w-32 rounded-full bg-gradient-to-l from-blue-500 to-cyan-500"></div>
    </div>
);

const WelcomeView: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
        <WelcomeIllustration />
        <h2 className="text-4xl font-bold text-white mb-4 mt-8">مرحباً بك في لوحة خدماتنا</h2>
        <p className="text-xl text-gray-400 max-w-2xl">
            نحن درعك الرقمي. استكشف مجموعتنا الشاملة من خدمات الأمن السيبراني المصممة لحمايتك. ابدأ بتحديد فئة من القائمة الجانبية.
        </p>
    </div>
);

export const MainContent: React.FC<MainContentProps> = ({
    mainCategory,
    subCategory,
    service,
    onSubCategorySelect,
    onServiceSelect,
    onBack,
    mainCategoryKey,
    subCategoryKey
}) => {
    const mainContentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [mainCategory, subCategory, service]);

    let titleContent = "اختر قسمًا للبدء";
    if (mainCategory) {
        titleContent = mainCategory.name;
    }
    if (subCategory) {
        titleContent = `${titleContent} / ${subCategory.name}`;
    }
    
    return (
        <main ref={mainContentRef} className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-black/10">
            {!mainCategory && <WelcomeView />}
            
            {mainCategory && (
                <div className="animate-fade-in">
                    {!service && <Title>{titleContent}</Title>}

                    {service && mainCategoryKey && subCategoryKey ? (
                        <ServiceDetails service={service} onBack={onBack} mainCategoryName={mainCategory.name} subCategoryName={subCategory!.name} />
                    ) : subCategory && mainCategoryKey && subCategoryKey ? (
                        <ServiceGrid services={subCategory.services} onServiceSelect={(serviceKey) => onServiceSelect(mainCategoryKey, subCategoryKey, serviceKey)} />
                    ) : (
                        <SubCategoryGrid subCategories={mainCategory.subCategories} onSubCategorySelect={(subKey) => onSubCategorySelect(mainCategoryKey!, subKey)} />
                    )}
                </div>
            )}
        </main>
    );
};
