import React from 'react';
import type { Service } from '../types';
import { Clock, CheckCircle2, DollarSign, ArrowRight } from './icons/Icons';

interface ServiceDetailsProps {
    service: Service;
    onBack: () => void;
    mainCategoryName: string;
    subCategoryName: string;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack, mainCategoryName, subCategoryName }) => {
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-inner border border-gray-700/50 animate-fade-in">
            <div className="mb-8">
                 <button onClick={onBack} className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-lg mb-4 font-semibold">
                    <ArrowRight />
                    <span className="mr-2">العودة إلى الخدمات</span>
                </button>
                <p className="text-gray-500 text-sm">{mainCategoryName} / {subCategoryName}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-blue-400 mt-1 pb-4 border-b-2 border-blue-500/30">{service.name}</h3>
            </div>
            
            <div className="bg-gray-800/60 p-6 rounded-lg shadow-sm mb-6 border border-gray-700/80">
                 <p className="text-gray-300 leading-relaxed text-lg">{service.description}</p>
            </div>
            
            <div className="mb-6 bg-gray-800/60 p-6 rounded-lg shadow-sm border border-gray-700/80">
                <h4 className="text-xl font-semibold text-white mb-6">خطوات العمل:</h4>
                <ul className="relative pr-8 space-y-8 before:absolute before:top-2 before:bottom-2 before:right-3 before:w-0.5 before:bg-blue-500/30">
                    {service.steps.map((step, index) => (
                        <li key={index} className="flex items-start relative">
                            <div className="absolute -right-[23px] top-[1px] bg-gray-800">
                                <CheckCircle2 />
                            </div>
                            <span className="mr-3 flex-1 text-gray-300">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-900/40 to-gray-800/40 p-6 rounded-lg shadow-md border border-purple-600/50 flex items-center">
                    <DollarSign />
                    <div className="mr-4">
                        <h4 className="text-lg font-semibold text-white mb-1">الرسوم المقدرة</h4>
                        <p className="text-purple-300 font-bold text-2xl">{service.fees}</p>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-teal-900/40 to-gray-800/40 p-6 rounded-lg shadow-md border border-teal-500/50 flex items-center">
                    <Clock />
                    <div className="mr-4">
                        <h4 className="text-lg font-semibold text-white mb-1">الوقت اللازم للإنجاز</h4>
                        <p className="text-teal-300 font-bold text-2xl">{service.time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
