<template>
    <div class="area-information">
        <div class="content">
            <h2>제가 제일<br />잘하는 일을<br />소개합니다 👏</h2>
            <ul>
                <li v-for="item in skills" :key="item.title">
                    <p class="title">{{ item.title }}</p>
                    <p v-html="item.description" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SkillItem } from "../../core/types/site";

const skills: SkillItem[] = [
    {
        title: "UI Development",
        description:
            "웹 퍼블리싱을 빠삭하게 이해하며 잘 다룹니다.<br>유지보수를 고려한 코드 작성, 협업을 위한 가이드 제작 등 탄탄한 업무 프로세스를 지향합니다."
    },
    {
        title: "Markup",
        description: "웹 표준을 바탕으로 꼼꼼한 시멘틱 마크업을 작성합니다.<br>검색 엔진 최적화(SEO)를 통해 더 많은 사용자에게 접근할 수 있도록 합니다."
    },
    {
        title: "Co-work",
        description:
            "디자이너, 개발자와 가깝게 일하며, 항상 원활한 협업을 끌어내려고 노력합니다.<br>의도를 이해하고 존중하며 ‘함께' 좋은 결과물을 만듭니다."
    },
    {
        title: "Up Skills",
        description: "코드를 잘 그려내기 위해 계속 공부 중!<br>SCSS, SVN, Figma 등 생산성과 협업을 위한 지식을 배우고 적용하며 공유합니다."
    },
    {
        title: "For Users",
        description:
            "다양한 직군과 함께 사용자 입장에서 생각하고 고민하는 걸 좋아합니다.<br>반응형, 인터랙션 등 사용자에게 편하고 즐거운 UX를 만드는 데 관심이 많습니다."
    }
];
</script>
