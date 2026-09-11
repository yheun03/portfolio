export type WorkCategory = 'project' | 'operation' | 'solution' | 'renewal' | 'award' | 'personal';

export type WorkItem = {
    id: string;
    category: WorkCategory;
    title: string;
    period: string;
    type: string;
    role: string;
    tech: string[];
    introduction: string;
    myWorks: string[];
    achievements: string[];
    points: string[];
    pin: boolean;
    duration: string;
    captures: string[];
    languages: string[];
    thumbnail?: string;
    links?: { label: string; href: string }[];
};
