import React from 'react';
import type { Service } from '../types';

interface ServiceGridProps {
    services: { [key: string]: Service };
    onServiceSelect: (key: string) => void;
}

const Card: React.FC<{ service: Service, onClick: () => void }> = ({ service, onClick }) => (
    <div
        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] backdrop-blur-sm overflow-hidden flex flex-col"
        onClick={onClick}
    >
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-radial-gradient from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        <div className="relative z-10 flex flex-col items-center justify-start h-full">
            <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{service.serviceIcon || '✨'}</div>
            <h4 className="text-lg font-bold text-blue-400 mb-2 flex-grow">{service.name}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{service.description.substring(0, 90)}...</p>
        </div>
    </div>
);


export const ServiceGrid: React.FC<ServiceGridProps> = ({ services, onServiceSelect }) => {
    const serviceEntries = Object.entries(services);

     if (serviceEntries.length === 0) {
        return <p className="text-gray-500 text-center col-span-full text-xl py-8">لا توجد خدمات في هذا القسم الفرعي.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {serviceEntries.map(([key, service], index) => (
                <div key={key} className="animate-slide-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                    <Card service={service} onClick={() => onServiceSelect(key)} />
                </div>
            ))}
        </div>
    );
};
