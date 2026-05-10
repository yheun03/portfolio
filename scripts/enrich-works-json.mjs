/**
 * `core/data/json/works/*.json` 배열 항목에 pin, duration, captures, languages 를 채웁니다.
 * (기존 필드가 있으면 유지)
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const worksDir = join(root, "core/data/json/works");

const LANG_HINT = new Set([
    "HTML",
    "CSS",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "SCSS",
    "Vue",
    "Vue.js",
    "Vue 3",
    "React",
    "React.js",
    "jQuery",
    "C#",
    "XML",
    "CSHTML",
    "Nuxt",
]);

function languagesFromTech(tech) {
    const out = [];
    for (const t of tech) {
        if (LANG_HINT.has(t) || /script$/i.test(t) || t === "Nuxt") {
            out.push(t === "Vue.js" ? "Vue" : t === "React.js" ? "React" : t);
        }
    }
    return [...new Set(out)];
}

const PINNED_CAREER = new Set([
    "orchem-mes",
    "infra",
    "company-renewal",
    "hanon",
    "hanjinkal",
    "oms",
]);

const PINNED_PERSONAL = new Set(["portfolio-2026", "ui-playground"]);

const PLACEHOLDER = "/images/projects/placeholder.svg";

const DURATION_BY_ID = {
    "orchem-mes": { ko: "진행 중 · 약 3개월~", en: "Ongoing · ~3+ months" },
    infra: { ko: "약 2개월", en: "~2 months" },
    hanon: { ko: "약 8개월~", en: "~8+ months" },
    "company-renewal": { ko: "약 2개월", en: "~2 months" },
    "kyungdongwon-cms": { ko: "약 3주", en: "~3 weeks" },
    hanjinkal: { ko: "약 6개월", en: "~6 months" },
    fems: { ko: "약 2주", en: "~2 weeks" },
    oms: { ko: "약 8개월", en: "~8 months" },
    "scm-daeyang-paper": { ko: "약 2개월", en: "~2 months" },
    "robo-tms": { ko: "약 3개월", en: "~3 months" },
    "scm-daeyang-board": { ko: "약 6개월", en: "~6 months" },
    "tms-maintenance": { ko: "약 1개월", en: "~1 month" },
    "tms-operation": { ko: "약 2개월", en: "~2 months" },
    "robo-mes": { ko: "약 9개월", en: "~9 months" },
    "company-renewal-2022": { ko: "약 3개월", en: "~3 months" },
    toms: { ko: "약 3개월", en: "~3 months" },
    "smart-factory-gov": { ko: "약 15개월", en: "~15 months" },
    "incheon-university": { ko: "약 2개월", en: "~2 months" },
    "tos-renewal": { ko: "약 2개월", en: "~2 months" },
    "kwangjang-homepage": { ko: "약 2개월", en: "~2 months" },
    "hama-app": { ko: "약 2개월", en: "~2 months" },
    "portfolio-2026": { ko: "약 2개월", en: "~2 months" },
    "ui-playground": { ko: "약 12개월 (병행)", en: "~12 months (parallel)" },
};

function enrichItem(item, personal) {
    const id = item.id;
    const duration =
        item.duration ??
        DURATION_BY_ID[id] ?? {
            ko: `기간 ${item.period} 기준`,
            en: `Around ${item.period}`,
        };
    const captures = item.captures?.length ? item.captures : [PLACEHOLDER];
    let languages = item.languages?.length ? item.languages : languagesFromTech(item.tech ?? []);
    if (!languages.length) {
        languages = ["HTML", "CSS"];
    }
    const pin =
        typeof item.pin === "boolean"
            ? item.pin
            : personal
              ? PINNED_PERSONAL.has(id)
              : PINNED_CAREER.has(id);

    return {
        ...item,
        pin,
        duration,
        captures,
        languages,
    };
}

for (const name of readdirSync(worksDir)) {
    if (!name.endsWith(".json")) continue;
    const full = join(worksDir, name);
    const raw = JSON.parse(readFileSync(full, "utf8"));
    if (!Array.isArray(raw)) continue;
    const personal = name === "personal.json";
    const next = raw.map((item) => enrichItem(item, personal));
    writeFileSync(full, `${JSON.stringify(next, null, 2)}\n`);
    console.log("enriched", name, next.length);
}
