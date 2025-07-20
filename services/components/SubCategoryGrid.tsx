import React from 'react';
import type { SubCategory } from '../types';

interface SubCategoryGridProps {
    subCategories: { [key: string]: Omit<SubCategory, 'key'> };
    onSubCategorySelect: (key: string) => void;
}

const Card: React.FC<{ subCategory: Omit<SubCategory, 'key'>, onClick: () => void }> = ({ subCategory, onClick }) => (
    <div
        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] backdrop-blur-sm overflow-hidden"
        onClick={onClick}
    >
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-radial-gradient from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{subCategory.subIcon || '📁'}</div>
            <h4 className="text-xl font-bold text-blue-400">{subCategory.name}</h4>
        </div>
    </div>
);

export const SubCategoryGrid: React.FC<SubCategoryGridProps> = ({ subCategories, onSubCategorySelect }) => {
    const subCategoryEntries = Object.entries(subCategories);

    if (subCategoryEntries.length === 0) {
        return <p className="text-gray-500 text-center col-span-full text-xl py-8">لا توجد أقسام فرعية في هذا القسم.</p>;
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subCategoryEntries.map(([key, subCategory], index) => (
                 <div key={key} className="animate-slide-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                    <Card subCategory={subCategory} onClick={() => onSubCategorySelect(key)} />
                </div>
            ))}
        </div>
    );
};
