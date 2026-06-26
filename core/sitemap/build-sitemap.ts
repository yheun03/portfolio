import { careerWorks, personalWorksList } from '../../data/works';
import { buildAbsoluteSeoUrl } from '../utils/seo-url';

type SitemapEntry = {
    loc: string;
    changefreq: 'weekly' | 'monthly';
    priority: string;
};

function urlEntry({ loc, changefreq, priority }: SitemapEntry, lastmod: string) {
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/** `public/sitemap.xml` 생성용 — 빌드 시 `data/works`와 동기화 */
export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
    const entries: SitemapEntry[] = [
        { loc: buildAbsoluteSeoUrl('/'), changefreq: 'weekly', priority: '1.0' },
        { loc: buildAbsoluteSeoUrl('/projects'), changefreq: 'weekly', priority: '0.9' },
        { loc: buildAbsoluteSeoUrl('/personal'), changefreq: 'weekly', priority: '0.9' },
        { loc: buildAbsoluteSeoUrl('/journey'), changefreq: 'monthly', priority: '0.7' },
        ...careerWorks.map((work) => ({
            loc: buildAbsoluteSeoUrl(`/projects/${work.id}`),
            changefreq: 'monthly' as const,
            priority: '0.8',
        })),
        ...personalWorksList.map((work) => ({
            loc: buildAbsoluteSeoUrl(`/personal/${work.id}`),
            changefreq: 'monthly' as const,
            priority: '0.75',
        })),
    ];

    const body = entries.map((entry) => urlEntry(entry, lastmod)).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}
