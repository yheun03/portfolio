import { toRef, isRef, defineComponent, ref, mergeProps, useSSRContext, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, watch } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { a as useNuxtApp, _ as _export_sfc } from "../server.mjs";
import { u as useHead } from "./v3-2dEfNlCB.js";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/hookable/dist/index.mjs";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/unctx/dist/index.mjs";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/ufo/dist/index.mjs";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/klona/dist/index.mjs";
import "axios";
import "/Users/eun/Documents/GitHub/portfolio/node_modules/@unhead/vue/dist/index.mjs";
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "WelcomeCanvas",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "area-welcome" }, _attrs))}><canvas id="animatedCanvas"></canvas></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/WelcomeCanvas.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const photoDesktop = "" + __buildAssetsURL("photo-1920.VQx3onWq.webp");
const photoMobile = "" + __buildAssetsURL("photo-1440.BtTsqhyv.webp");
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "IntroSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "area-intro" }, _attrs))}><div class="content"><div><h1> 안녕하세요! <br>저는 견고한 UI와 <br>무결점 코드를 작성하는 <br>ENTJ 웹 퍼블리셔입니다✌ </h1><picture><source${ssrRenderAttr("srcset", unref(photoMobile))} media="(max-width: 1024px)"><img${ssrRenderAttr("src", unref(photoDesktop))} width="428" height="550" alt="이 포트폴리오의 주인인 은영환의 증명사진 입니다."></picture></div><div><a href="/src/assets/files/resume.html" class="btn" aria-label="사람인 양식 이력서 보기">이력서 보기</a><p> 안녕하세요! 4년 차 웹 퍼블리셔 은영환입니다.😁 <br><br>모듈 단위의 유지보수에 최적화된 퍼블리싱에 관심이 많습니다. <br>실제 사용하는 사용자의 입장에서 생각하는 걸 좋아해서 지속해서 <span>재고</span>하고 <span>제고</span>합니다. <br><br>사용자의 기억에 남도록 웹 페이지를 퍼블리싱 하는 걸 좋아합니다. <br>좋아하니까 즐기게 되고, 더 잘하고 싶어집니다. <br>그래서 여가를 할애하여 디자인 트렌드와 더 깊은 개발 언어를 학습합니다. <br><br>순도 90% ENTJ로써 강한 성취욕과 명예욕이 있습니다. <br>따라서 현재 제 실력에 안주하지 않고 더 나은 웹 퍼블리셔 <br>더 나아가 웹 프론트엔드 개발자가 되기 위해 노력합니다. </p></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/IntroSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "InformationSection",
  __ssrInlineRender: true,
  setup(__props) {
    const skills = [
      {
        title: "UI Development",
        description: "웹 퍼블리싱을 빠삭하게 이해하며 잘 다룹니다.<br>유지보수를 고려한 코드 작성, 협업을 위한 가이드 제작 등 탄탄한 업무 프로세스를 지향합니다."
      },
      {
        title: "Markup",
        description: "웹 표준을 바탕으로 꼼꼼한 시멘틱 마크업을 작성합니다.<br>검색 엔진 최적화(SEO)를 통해 더 많은 사용자에게 접근할 수 있도록 합니다."
      },
      {
        title: "Co-work",
        description: "디자이너, 개발자와 가깝게 일하며, 항상 원활한 협업을 끌어내려고 노력합니다.<br>의도를 이해하고 존중하며 ‘함께' 좋은 결과물을 만듭니다."
      },
      {
        title: "Up Skills",
        description: "코드를 잘 그려내기 위해 계속 공부 중!<br>SCSS, SVN, Figma 등 생산성과 협업을 위한 지식을 배우고 적용하며 공유합니다."
      },
      {
        title: "For Users",
        description: "다양한 직군과 함께 사용자 입장에서 생각하고 고민하는 걸 좋아합니다.<br>반응형, 인터랙션 등 사용자에게 편하고 즐거운 UX를 만드는 데 관심이 많습니다."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "area-information" }, _attrs))}><div class="content"><h2>제가 제일<br>잘하는 일을<br>소개합니다 👏</h2><ul><!--[-->`);
      ssrRenderList(skills, (item) => {
        _push(`<li><p class="title">${ssrInterpolate(item.title)}</p><p>${item.description ?? ""}</p></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/InformationSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const matemateThumb = "" + __buildAssetsURL("thumbnail-pc.DnUAd7xW.png");
const gongtingThumb = "" + __buildAssetsURL("thumbnail-mb.CvyLJe3j.png");
const matemate1 = "" + __buildAssetsURL("modal-01.BiaKZbTJ.png");
const matemate2 = "" + __buildAssetsURL("modal-02.UPMADVXT.png");
const matemate3 = "" + __buildAssetsURL("modal-03.DbNsFRV-.png");
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProjectsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const modules = [Navigation, Pagination, Autoplay];
    const activeProject = ref(null);
    const projects = [
      {
        id: 1,
        name: "matemate",
        headline: "더 나은<br>기숙사 생활을 위해!<br>MATEMATE! 🙌",
        title: "한국공학대학교 방학 프로젝트 - 메이트메이트",
        description: "기숙사 룸메이트 매칭 과정의 불편함을 줄이기 위해, 생활 습관과 성향 기반으로 매칭하는 디지털 솔루션을 기획/퍼블리싱했습니다.",
        contributions: ["기획 90%", "디자인 30%", "퍼블리싱 100%", "HTML", "SCSS", "Javascript", "Figma"],
        thumbnail: matemateThumb,
        thumbnailAlt: "한국공학대학교 방학 프로젝트인 메이트메이트 서비스의 캡쳐 이미지 본입니다.",
        detailTags: ["모바일 기반 서비스", "HTML과 타입립스, Firebase"],
        detailSections: [
          {
            title: "프로젝트 배경",
            description: "랜덤 배정 중심의 룸메이트 문화에서 발생하는 갈등 문제를 해결하기 위해, 학생이 직접 조건 기반으로 룸메이트를 찾는 서비스를 설계했습니다.",
            image: matemate1,
            imageAlt: "메이트메이트 프로젝트 배경 이미지"
          },
          {
            title: "프로젝트 목적",
            description: "학생들의 성향/생활 습관 기반 매칭으로 불편함을 낮추고, 긍정적인 기숙사 경험을 제공하는 것을 목표로 했습니다.",
            image: matemate2,
            imageAlt: "메이트메이트 프로젝트 목적 이미지"
          },
          {
            title: "UIUX 디자인",
            description: "반복 수정이 많은 C2C 서비스 특성을 고려해, 입력-수정-확인이 쉬운 흐름으로 UX를 구성했습니다.",
            image: matemate3,
            imageAlt: "메이트메이트 UIUX 이미지"
          }
        ]
      },
      {
        id: 2,
        name: "gongting",
        headline: "인증된<br>가까운 사람들과!<br>너랑 나랑 공팅! 🙌",
        title: "한국공학대학교 방학 프로젝트 - 공팅",
        description: "팬데믹 이후 학생 간 교류 회복을 위해 블라인드 매칭 서비스를 만들었고, 사용자 연결 경험에 집중해 화면을 구성했습니다.",
        contributions: ["디자인 50%", "퍼블리싱 100%", "HTML", "SCSS", "Javascript", "Figma", "Adobe Photoshop", "Adobe Illustrator"],
        thumbnail: gongtingThumb,
        thumbnailAlt: "한국공학대학교 방학 프로젝트인 공팅 서비스의 캡쳐 이미지 본입니다.",
        detailTags: ["모바일 기반 서비스", "HTML5와 node.js, MySql"],
        detailSections: [
          { title: "프로젝트 배경", description: "사회적 거리두기 시기 학생들의 고립감을 낮추기 위해 상호작용 중심 서비스를 기획했습니다." },
          { title: "프로젝트 목표", description: "사용자 연결성과 실무형 웹 개발 경험을 동시에 확보하는 것이 핵심 목표였습니다." },
          { title: "매칭 알고리즘", description: "성별/MBTI/취미/특기 항목을 기준으로 점수를 계산해 매칭 후보를 추천했습니다." },
          { title: "시스템 구현", description: "프론트엔드, Node.js 백엔드, MySQL 저장소, REST API 구성으로 구현했습니다." },
          { title: "기대 효과", description: "학생 간 연결 강화와 서비스 운영 경험 확보라는 두 가지 결과를 기대했습니다." }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="area-projects"><button class="swiper-btn btn-gotoPrev" aria-label="이전 포트폴리오 정보로 이동하는 버튼"></button><button class="swiper-btn btn-gotoNext" aria-label="다음 포트폴리오 정보로 이동하는 버튼"></button>`);
      _push(ssrRenderComponent(unref(Swiper), {
        class: "swiper",
        modules,
        "slides-per-view": 1,
        "auto-height": true,
        autoplay: { delay: 1e4 },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { prevEl: ".btn-gotoPrev", nextEl: ".btn-gotoNext" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(projects, (project) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: project.id,
                class: "proj"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="content"${_scopeId2}><div class="proj-screen"${_scopeId2}><div class="proj-screen-mockup-wrap"${_scopeId2}><div class="proj-screen-mockup"${_scopeId2}><img${ssrRenderAttr("src", project.thumbnail)}${ssrRenderAttr("alt", project.thumbnailAlt)}${_scopeId2}></div></div></div><div class="proj-information"${_scopeId2}><div${_scopeId2}><h2${_scopeId2}>${project.headline ?? ""}</h2><p class="title"${_scopeId2}>${ssrInterpolate(project.title)}</p><p${_scopeId2}>${ssrInterpolate(project.description)}</p><ul${_scopeId2}><!--[-->`);
                    ssrRenderList(project.contributions, (item) => {
                      _push3(`<li${_scopeId2}>${ssrInterpolate(item)}</li>`);
                    });
                    _push3(`<!--]--></ul></div><button class="btn type-round bg-primary"${_scopeId2}>상세보기</button></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "content" }, [
                        createVNode("div", { class: "proj-screen" }, [
                          createVNode("div", { class: "proj-screen-mockup-wrap" }, [
                            createVNode("div", { class: "proj-screen-mockup" }, [
                              createVNode("img", {
                                src: project.thumbnail,
                                alt: project.thumbnailAlt
                              }, null, 8, ["src", "alt"])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "proj-information" }, [
                          createVNode("div", null, [
                            createVNode("h2", {
                              innerHTML: project.headline
                            }, null, 8, ["innerHTML"]),
                            createVNode("p", { class: "title" }, toDisplayString(project.title), 1),
                            createVNode("p", null, toDisplayString(project.description), 1),
                            createVNode("ul", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(project.contributions, (item) => {
                                return openBlock(), createBlock("li", {
                                  key: `${project.id}-${item}`
                                }, toDisplayString(item), 1);
                              }), 128))
                            ])
                          ]),
                          createVNode("button", {
                            class: "btn type-round bg-primary",
                            onClick: ($event) => activeProject.value = project
                          }, "상세보기", 8, ["onClick"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(projects, (project) => {
                return createVNode(unref(SwiperSlide), {
                  key: project.id,
                  class: "proj"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "content" }, [
                      createVNode("div", { class: "proj-screen" }, [
                        createVNode("div", { class: "proj-screen-mockup-wrap" }, [
                          createVNode("div", { class: "proj-screen-mockup" }, [
                            createVNode("img", {
                              src: project.thumbnail,
                              alt: project.thumbnailAlt
                            }, null, 8, ["src", "alt"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "proj-information" }, [
                        createVNode("div", null, [
                          createVNode("h2", {
                            innerHTML: project.headline
                          }, null, 8, ["innerHTML"]),
                          createVNode("p", { class: "title" }, toDisplayString(project.title), 1),
                          createVNode("p", null, toDisplayString(project.description), 1),
                          createVNode("ul", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(project.contributions, (item) => {
                              return openBlock(), createBlock("li", {
                                key: `${project.id}-${item}`
                              }, toDisplayString(item), 1);
                            }), 128))
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn type-round bg-primary",
                          onClick: ($event) => activeProject.value = project
                        }, "상세보기", 8, ["onClick"])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="swiper-pagination"></div></div>`);
      if (unref(activeProject)) {
        _push(`<div class="modal"><div class="modal-content active"><div class="modal-header"><h4>${ssrInterpolate(unref(activeProject).headline.replaceAll("<br>", " "))}</h4><ul><!--[-->`);
        ssrRenderList(unref(activeProject).detailTags, (tag) => {
          _push(`<li>${ssrInterpolate(tag)}</li>`);
        });
        _push(`<!--]--></ul><button class="btn type-round bg-black modal-close" aria-label="모달 닫기 버튼">닫기</button></div><div class="modal-body"><div class="wrap"><!--[-->`);
        ssrRenderList(unref(activeProject).detailSections, (section) => {
          _push(`<section><h5>${ssrInterpolate(section.title)}</h5><p>${ssrInterpolate(section.description)}</p>`);
          if (section.image) {
            _push(`<div class="wrap-img"><img${ssrRenderAttr("src", section.image)}${ssrRenderAttr("alt", section.imageAlt || section.title)}></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ProjectsSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "area-information type-history" }, _attrs))}><div class="content"><h2>제 모든 걸<br>소개합니다 👏</h2><ul><li><p class="title">경력<span>5년차</span></p><ul><li>(주)제이콥시스템<span>2019.06~2019.12</span><br>개발팀 / 학습근로자</li><li>조앤소프트(주)<span>2019.12~</span><br>UI/UX팀 / 주임</li></ul></li><li><p class="title">학력</p><ul><li><span class="align">서울장안중학교</span></li><li>서울디지텍고등학교</li><li><span class="align" title="컴퓨터전자공학과 인공지능트랙">한국공학대학교</span><span>(4.45/4.50)</span></li></ul></li><li><p class="title">자격증</p><ul><li>NCS 인공지능 개발_L5<span>2025.06</span></li><li>기업현장교사 3급<span>2024.12</span></li><li>컴퓨터활용능력 1급 (필기)<span>2024.05</span></li><li>정보처리기사 (필기)<span>2023.08</span></li><li>NCS SW 개발_L5<span>2022.12</span></li></ul></li></ul></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/HistorySection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(_attrs)}><p>본 페이지는 상업적 목적이 아닌,<br>개인 포트폴리오용으로 제작되었습니다.</p><address>Copyright 2025. 은영환. All rights reserved.</address></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SiteFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const useTheme = () => {
  const theme = useState("theme", () => "dark");
  const setTheme = (nextTheme) => {
    theme.value = nextTheme;
  };
  const initTheme = () => {
  };
  return { theme, setTheme, initTheme };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "웹 퍼블리셔 은영환 포트폴리오",
      meta: [
        { name: "description", content: "더 나은 내일을 위해 쉼 없이 달려가는 웹 퍼블리셔 은영환입니다." },
        { property: "og:title", content: "웹 퍼블리셔 은영환 포트폴리오" },
        { property: "og:description", content: "더 나은 내일을 위해 쉼 없이 달려가는 웹 퍼블리셔 은영환입니다." }
      ]
    });
    const { theme } = useTheme();
    watch(theme, (value) => {
      const body = (void 0).body;
      if (value === "dark") {
        body.classList.add("mode-dark");
      } else {
        body.classList.remove("mode-dark");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionsWelcomeCanvas = _sfc_main$6;
      const _component_SectionsIntroSection = _sfc_main$5;
      const _component_SectionsInformationSection = _sfc_main$4;
      const _component_SectionsProjectsSection = _sfc_main$3;
      const _component_SectionsHistorySection = __nuxt_component_4;
      const _component_SectionsSiteFooter = __nuxt_component_5;
      _push(`<!--[--><section><button class="btn set-mode" aria-label="다크모드, 라이트모드 전환"></button>`);
      _push(ssrRenderComponent(_component_SectionsWelcomeCanvas, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsIntroSection, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsInformationSection, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsProjectsSection, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsHistorySection, null, null, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_component_SectionsSiteFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CQeN5umF.js.map
