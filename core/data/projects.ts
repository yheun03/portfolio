import type { ProjectItem } from '~/core/types/site';

import matemateThumb from '~/assets/images/project/matemate/thumbnail-pc.png';
import gongtingThumb from '~/assets/images/project/gongting/thumbnail-mb.png';
import matemate1 from '~/assets/images/project/matemate/modal/modal-01.png';
import matemate2 from '~/assets/images/project/matemate/modal/modal-02.png';
import matemate3 from '~/assets/images/project/matemate/modal/modal-03.png';

/** 스와이퍼/레거시 프로젝트 showcase (학교 방학 프로젝트 등) */
export const showcaseProjects: ProjectItem[] = [
    {
        id: 1,
        name: 'matemate',
        headline: '더 나은<br>기숙사 생활을 위해!<br>MATEMATE! 🙌',
        title: '한국공학대학교 방학 프로젝트 - 메이트메이트',
        description:
            '기숙사 룸메이트 매칭 과정의 불편함을 줄이기 위해, 생활 습관과 성향 기반으로 매칭하는 디지털 솔루션을 기획/퍼블리싱했습니다.',
        contributions: ['기획 90%', '디자인 30%', '퍼블리싱 100%', 'HTML', 'SCSS', 'Javascript', 'Figma'],
        thumbnail: matemateThumb,
        thumbnailAlt: '한국공학대학교 방학 프로젝트인 메이트메이트 서비스의 캡쳐 이미지 본입니다.',
        detailTags: ['모바일 기반 서비스', 'HTML과 타입립스, Firebase'],
        detailSections: [
            {
                title: '프로젝트 배경',
                description:
                    '랜덤 배정 중심의 룸메이트 문화에서 발생하는 갈등 문제를 해결하기 위해, 학생이 직접 조건 기반으로 룸메이트를 찾는 서비스를 설계했습니다.',
                image: matemate1,
                imageAlt: '메이트메이트 프로젝트 배경 이미지',
            },
            {
                title: '프로젝트 목적',
                description:
                    '학생들의 성향/생활 습관 기반 매칭으로 불편함을 낮추고, 긍정적인 기숙사 경험을 제공하는 것을 목표로 했습니다.',
                image: matemate2,
                imageAlt: '메이트메이트 프로젝트 목적 이미지',
            },
            {
                title: 'UIUX 디자인',
                description: '반복 수정이 많은 C2C 서비스 특성을 고려해, 입력-수정-확인이 쉬운 흐름으로 UX를 구성했습니다.',
                image: matemate3,
                imageAlt: '메이트메이트 UIUX 이미지',
            },
        ],
    },
    {
        id: 2,
        name: 'gongting',
        headline: '인증된<br>가까운 사람들과!<br>너랑 나랑 공팅! 🙌',
        title: '한국공학대학교 방학 프로젝트 - 공팅',
        description:
            '팬데믹 이후 학생 간 교류 회복을 위해 블라인드 매칭 서비스를 만들었고, 사용자 연결 경험에 집중해 화면을 구성했습니다.',
        contributions: [
            '디자인 50%',
            '퍼블리싱 100%',
            'HTML',
            'SCSS',
            'Javascript',
            'Figma',
            'Adobe Photoshop',
            'Adobe Illustrator',
        ],
        thumbnail: gongtingThumb,
        thumbnailAlt: '한국공학대학교 방학 프로젝트인 공팅 서비스의 캡쳐 이미지 본입니다.',
        detailTags: ['모바일 기반 서비스', 'HTML5와 node.js, MySql'],
        detailSections: [
            { title: '프로젝트 배경', description: '사회적 거리두기 시기 학생들의 고립감을 낮추기 위해 상호작용 중심 서비스를 기획했습니다.' },
            { title: '프로젝트 목표', description: '사용자 연결성과 실무형 웹 개발 경험을 동시에 확보하는 것이 핵심 목표였습니다.' },
            { title: '매칭 알고리즘', description: '성별/MBTI/취미/특기 항목을 기준으로 점수를 계산해 매칭 후보를 추천했습니다.' },
            { title: '시스템 구현', description: '프론트엔드, Node.js 백엔드, MySQL 저장소, REST API 구성으로 구현했습니다.' },
            { title: '기대 효과', description: '학생 간 연결 강화와 서비스 운영 경험 확보라는 두 가지 결과를 기대했습니다.' },
        ],
    },
];
