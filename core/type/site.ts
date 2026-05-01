export interface SkillItem {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  headline: string;
  title: string;
  description: string;
  contributions: string[];
  thumbnail: string;
  thumbnailAlt: string;
  detailTags: string[];
  detailSections: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  }[];
}
