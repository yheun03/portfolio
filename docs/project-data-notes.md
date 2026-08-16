# 콘텐츠 관리

## 기본 원칙

- 한국어 콘텐츠는 `i18n/ko.json`에서 관리합니다.
- 영어 콘텐츠는 `i18n/en.json`에서 관리합니다.
- 두 파일은 같은 키와 데이터 구조를 유지합니다.
- 컴포넌트에는 한·영 문구를 직접 작성하지 않습니다.

## 파일 역할

| 파일                                    | 담당                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------ |
| `i18n/ko.json`                          | 한국어 UI 문구, 프로필, 소개, 프로젝트, 여정, 스킬, 하이라이트, SEO 문구 |
| `i18n/en.json`                          | 영어 UI 문구, 프로필, 소개, 프로젝트, 여정, 스킬, 하이라이트, SEO 문구   |
| `data/works.ts`                         | 현재 언어로 선택된 프로젝트 데이터 타입                                  |
| `components/home/PortfolioShowcase.vue` | 홈 대표 프로젝트 ID                                                      |
| `nuxt.config.ts`                        | 배포 경로와 환경 변수 같은 앱 설정                                       |

## 화면 사용

```ts
const { t, content } = useLocale();

const title = t('hero.title');
const profile = computed(() => content.value.profile);
const projects = computed(() => content.value.works.career);
```

- 짧은 문구는 `t('경로')`로 읽습니다.
- 배열·객체 콘텐츠는 `content.value`에서 읽습니다.
- 기존 `{ ko, en }` 객체와 `pick()` 방식은 사용하지 않습니다.

## 수정 위치

1. 프로젝트 추가/수정: `content.works`
2. 프로필·소개·여정·스킬: `content`
3. 수상·자격·역할·활동: `content.highlights`
4. 헤더·버튼·접근성 문구: 각 UI 키
5. 홈 대표 프로젝트 변경: `components/home/PortfolioShowcase.vue`
