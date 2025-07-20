
export interface Service {
    name: string;
    serviceIcon: string;
    description: string;
    steps: string[];
    fees: string;
    time: string;
}

export interface SubCategory {
    key: string;
    name: string;
    subIcon: string;
    services: { [key: string]: Service };
}

export interface MainCategory {
    key: string;
    name: string;
    icon: string;
}

export interface MainCategoryData {
    name: string;
    icon: string;
    subCategories: { [key: string]: Omit<SubCategory, 'key'> };
}

export interface ServicesData {
    [key: string]: MainCategoryData;
}
