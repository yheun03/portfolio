import { a as buildAssetsURL } from '../routes/renderer.mjs';
import {
    defineComponent,
    watch,
    ref,
    mergeProps,
    unref,
    withCtx,
    createVNode,
    toDisplayString,
    openBlock,
    createBlock,
    Fragment,
    renderList,
    toRef,
    isRef,
    useSSRContext,
} from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { _ as _export_sfc, a as useNuxtApp } from './server.mjs';
import { u as useHead } from './v3-2dEfNlCB.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import 'axios';

const useStateKeyPrefix = '$s';
function useState(...args) {
    const autoKey = typeof args[args.length - 1] === 'string' ? args.pop() : void 0;
    if (typeof args[0] !== 'string') {
        args.unshift(autoKey);
    }
    const [_key, init] = args;
    if (!_key || typeof _key !== 'string') {
        throw new TypeError('[nuxt] [useState] key must be a string: ' + _key);
    }
    if (init !== void 0 && typeof init !== 'function') {
        throw new Error('[nuxt] [useState] init must be a function: ' + init);
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
    __name: 'WelcomeCanvas',
    __ssrInlineRender: true,
    setup(__props) {
        ref(null);
        return (_ctx, _push, _parent, _attrs) => {
            _push(`<div${ssrRenderAttrs(mergeProps({ class: 'area-welcome' }, _attrs))}><canvas id="animatedCanvas"></canvas></div>`);
        };
    },
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add('components/sections/WelcomeCanvas.vue');
    return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const photoDesktop = '' + buildAssetsURL('photo-1920.VQx3onWq.webp');
const photoMobile = '' + buildAssetsURL('photo-1440.BtTsqhyv.webp');
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
    __name: 'IntroSection',
    __ssrInlineRender: true,
    setup(__props) {
        return (_ctx, _push, _parent, _attrs) => {
            _push(
                `<div${ssrRenderAttrs(mergeProps({ class: 'area-intro' }, _attrs))}><div class="content"><div><h1> \uC548\uB155\uD558\uC138\uC694! <br>\uC800\uB294 \uACAC\uACE0\uD55C UI\uC640 <br>\uBB34\uACB0\uC810 \uCF54\uB4DC\uB97C \uC791\uC131\uD558\uB294 <br>ENTJ \uC6F9 \uD37C\uBE14\uB9AC\uC154\uC785\uB2C8\uB2E4\u270C </h1><picture><source${ssrRenderAttr('srcset', unref(photoMobile))} media="(max-width: 1024px)"><img${ssrRenderAttr('src', unref(photoDesktop))} width="428" height="550" alt="\uC774 \uD3EC\uD2B8\uD3F4\uB9AC\uC624\uC758 \uC8FC\uC778\uC778 \uC740\uC601\uD658\uC758 \uC99D\uBA85\uC0AC\uC9C4 \uC785\uB2C8\uB2E4."></picture></div><div><a href="~/assets/files/resume.html" class="btn" aria-label="\uC0AC\uB78C\uC778 \uC591\uC2DD \uC774\uB825\uC11C \uBCF4\uAE30">\uC774\uB825\uC11C \uBCF4\uAE30</a><p> \uC548\uB155\uD558\uC138\uC694! 4\uB144 \uCC28 \uC6F9 \uD37C\uBE14\uB9AC\uC154 \uC740\uC601\uD658\uC785\uB2C8\uB2E4.\u{1F601} <br><br>\uBAA8\uB4C8 \uB2E8\uC704\uC758 \uC720\uC9C0\uBCF4\uC218\uC5D0 \uCD5C\uC801\uD654\uB41C \uD37C\uBE14\uB9AC\uC2F1\uC5D0 \uAD00\uC2EC\uC774 \uB9CE\uC2B5\uB2C8\uB2E4. <br>\uC2E4\uC81C \uC0AC\uC6A9\uD558\uB294 \uC0AC\uC6A9\uC790\uC758 \uC785\uC7A5\uC5D0\uC11C \uC0DD\uAC01\uD558\uB294 \uAC78 \uC88B\uC544\uD574\uC11C \uC9C0\uC18D\uD574\uC11C <span>\uC7AC\uACE0</span>\uD558\uACE0 <span>\uC81C\uACE0</span>\uD569\uB2C8\uB2E4. <br><br>\uC0AC\uC6A9\uC790\uC758 \uAE30\uC5B5\uC5D0 \uB0A8\uB3C4\uB85D \uC6F9 \uD398\uC774\uC9C0\uB97C \uD37C\uBE14\uB9AC\uC2F1 \uD558\uB294 \uAC78 \uC88B\uC544\uD569\uB2C8\uB2E4. <br>\uC88B\uC544\uD558\uB2C8\uAE4C \uC990\uAE30\uAC8C \uB418\uACE0, \uB354 \uC798\uD558\uACE0 \uC2F6\uC5B4\uC9D1\uB2C8\uB2E4. <br>\uADF8\uB798\uC11C \uC5EC\uAC00\uB97C \uD560\uC560\uD558\uC5EC \uB514\uC790\uC778 \uD2B8\uB80C\uB4DC\uC640 \uB354 \uAE4A\uC740 \uAC1C\uBC1C \uC5B8\uC5B4\uB97C \uD559\uC2B5\uD569\uB2C8\uB2E4. <br><br>\uC21C\uB3C4 90% ENTJ\uB85C\uC368 \uAC15\uD55C \uC131\uCDE8\uC695\uACFC \uBA85\uC608\uC695\uC774 \uC788\uC2B5\uB2C8\uB2E4. <br>\uB530\uB77C\uC11C \uD604\uC7AC \uC81C \uC2E4\uB825\uC5D0 \uC548\uC8FC\uD558\uC9C0 \uC54A\uACE0 \uB354 \uB098\uC740 \uC6F9 \uD37C\uBE14\uB9AC\uC154 <br>\uB354 \uB098\uC544\uAC00 \uC6F9 \uD504\uB860\uD2B8\uC5D4\uB4DC \uAC1C\uBC1C\uC790\uAC00 \uB418\uAE30 \uC704\uD574 \uB178\uB825\uD569\uB2C8\uB2E4. </p></div></div></div>`,
            );
        };
    },
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add('components/sections/IntroSection.vue');
    return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
    __name: 'InformationSection',
    __ssrInlineRender: true,
    setup(__props) {
        const skills = [
            {
                title: 'UI Development',
                description:
                    '\uC6F9 \uD37C\uBE14\uB9AC\uC2F1\uC744 \uBE60\uC0AD\uD558\uAC8C \uC774\uD574\uD558\uBA70 \uC798 \uB2E4\uB8F9\uB2C8\uB2E4.<br>\uC720\uC9C0\uBCF4\uC218\uB97C \uACE0\uB824\uD55C \uCF54\uB4DC \uC791\uC131, \uD611\uC5C5\uC744 \uC704\uD55C \uAC00\uC774\uB4DC \uC81C\uC791 \uB4F1 \uD0C4\uD0C4\uD55C \uC5C5\uBB34 \uD504\uB85C\uC138\uC2A4\uB97C \uC9C0\uD5A5\uD569\uB2C8\uB2E4.',
            },
            {
                title: 'Markup',
                description:
                    '\uC6F9 \uD45C\uC900\uC744 \uBC14\uD0D5\uC73C\uB85C \uAF3C\uAF3C\uD55C \uC2DC\uBA58\uD2F1 \uB9C8\uD06C\uC5C5\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.<br>\uAC80\uC0C9 \uC5D4\uC9C4 \uCD5C\uC801\uD654(SEO)\uB97C \uD1B5\uD574 \uB354 \uB9CE\uC740 \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC811\uADFC\uD560 \uC218 \uC788\uB3C4\uB85D \uD569\uB2C8\uB2E4.',
            },
            {
                title: 'Co-work',
                description:
                    "\uB514\uC790\uC774\uB108, \uAC1C\uBC1C\uC790\uC640 \uAC00\uAE5D\uAC8C \uC77C\uD558\uBA70, \uD56D\uC0C1 \uC6D0\uD65C\uD55C \uD611\uC5C5\uC744 \uB04C\uC5B4\uB0B4\uB824\uACE0 \uB178\uB825\uD569\uB2C8\uB2E4.<br>\uC758\uB3C4\uB97C \uC774\uD574\uD558\uACE0 \uC874\uC911\uD558\uBA70 \u2018\uD568\uAED8' \uC88B\uC740 \uACB0\uACFC\uBB3C\uC744 \uB9CC\uB4ED\uB2C8\uB2E4.",
            },
            {
                title: 'Up Skills',
                description:
                    '\uCF54\uB4DC\uB97C \uC798 \uADF8\uB824\uB0B4\uAE30 \uC704\uD574 \uACC4\uC18D \uACF5\uBD80 \uC911!<br>SCSS, SVN, Figma \uB4F1 \uC0DD\uC0B0\uC131\uACFC \uD611\uC5C5\uC744 \uC704\uD55C \uC9C0\uC2DD\uC744 \uBC30\uC6B0\uACE0 \uC801\uC6A9\uD558\uBA70 \uACF5\uC720\uD569\uB2C8\uB2E4.',
            },
            {
                title: 'For Users',
                description:
                    '\uB2E4\uC591\uD55C \uC9C1\uAD70\uACFC \uD568\uAED8 \uC0AC\uC6A9\uC790 \uC785\uC7A5\uC5D0\uC11C \uC0DD\uAC01\uD558\uACE0 \uACE0\uBBFC\uD558\uB294 \uAC78 \uC88B\uC544\uD569\uB2C8\uB2E4.<br>\uBC18\uC751\uD615, \uC778\uD130\uB799\uC158 \uB4F1 \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uD3B8\uD558\uACE0 \uC990\uAC70\uC6B4 UX\uB97C \uB9CC\uB4DC\uB294 \uB370 \uAD00\uC2EC\uC774 \uB9CE\uC2B5\uB2C8\uB2E4.',
            },
        ];
        return (_ctx, _push, _parent, _attrs) => {
            _push(
                `<div${ssrRenderAttrs(mergeProps({ class: 'area-information' }, _attrs))}><div class="content"><h2>\uC81C\uAC00 \uC81C\uC77C<br>\uC798\uD558\uB294 \uC77C\uC744<br>\uC18C\uAC1C\uD569\uB2C8\uB2E4 \u{1F44F}</h2><ul><!--[-->`,
            );
            ssrRenderList(skills, (item) => {
                var _a;
                _push(`<li><p class="title">${ssrInterpolate(item.title)}</p><p>${(_a = item.description) != null ? _a : ''}</p></li>`);
            });
            _push(`<!--]--></ul></div></div>`);
        };
    },
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add('components/sections/InformationSection.vue');
    return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const matemateThumb = '' + buildAssetsURL('thumbnail-pc.DnUAd7xW.png');
const gongtingThumb = '' + buildAssetsURL('thumbnail-mb.CvyLJe3j.png');
const matemate1 = '' + buildAssetsURL('modal-01.BiaKZbTJ.png');
const matemate2 = '' + buildAssetsURL('modal-02.UPMADVXT.png');
const matemate3 = '' + buildAssetsURL('modal-03.DbNsFRV-.png');
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
    __name: 'ProjectsSection',
    __ssrInlineRender: true,
    setup(__props) {
        const modules = [Navigation, Pagination, Autoplay];
        const activeProject = ref(null);
        const projects = [
            {
                id: 1,
                name: 'matemate',
                headline: '\uB354 \uB098\uC740<br>\uAE30\uC219\uC0AC \uC0DD\uD65C\uC744 \uC704\uD574!<br>MATEMATE! \u{1F64C}',
                title: '\uD55C\uAD6D\uACF5\uD559\uB300\uD559\uAD50 \uBC29\uD559 \uD504\uB85C\uC81D\uD2B8 - \uBA54\uC774\uD2B8\uBA54\uC774\uD2B8',
                description:
                    '\uAE30\uC219\uC0AC \uB8F8\uBA54\uC774\uD2B8 \uB9E4\uCE6D \uACFC\uC815\uC758 \uBD88\uD3B8\uD568\uC744 \uC904\uC774\uAE30 \uC704\uD574, \uC0DD\uD65C \uC2B5\uAD00\uACFC \uC131\uD5A5 \uAE30\uBC18\uC73C\uB85C \uB9E4\uCE6D\uD558\uB294 \uB514\uC9C0\uD138 \uC194\uB8E8\uC158\uC744 \uAE30\uD68D/\uD37C\uBE14\uB9AC\uC2F1\uD588\uC2B5\uB2C8\uB2E4.',
                contributions: ['\uAE30\uD68D 90%', '\uB514\uC790\uC778 30%', '\uD37C\uBE14\uB9AC\uC2F1 100%', 'HTML', 'SCSS', 'Javascript', 'Figma'],
                thumbnail: matemateThumb,
                thumbnailAlt:
                    '\uD55C\uAD6D\uACF5\uD559\uB300\uD559\uAD50 \uBC29\uD559 \uD504\uB85C\uC81D\uD2B8\uC778 \uBA54\uC774\uD2B8\uBA54\uC774\uD2B8 \uC11C\uBE44\uC2A4\uC758 \uCEA1\uCCD0 \uC774\uBBF8\uC9C0 \uBCF8\uC785\uB2C8\uB2E4.',
                detailTags: ['\uBAA8\uBC14\uC77C \uAE30\uBC18 \uC11C\uBE44\uC2A4', 'HTML\uACFC \uD0C0\uC785\uB9BD\uC2A4, Firebase'],
                detailSections: [
                    {
                        title: '\uD504\uB85C\uC81D\uD2B8 \uBC30\uACBD',
                        description:
                            '\uB79C\uB364 \uBC30\uC815 \uC911\uC2EC\uC758 \uB8F8\uBA54\uC774\uD2B8 \uBB38\uD654\uC5D0\uC11C \uBC1C\uC0DD\uD558\uB294 \uAC08\uB4F1 \uBB38\uC81C\uB97C \uD574\uACB0\uD558\uAE30 \uC704\uD574, \uD559\uC0DD\uC774 \uC9C1\uC811 \uC870\uAC74 \uAE30\uBC18\uC73C\uB85C \uB8F8\uBA54\uC774\uD2B8\uB97C \uCC3E\uB294 \uC11C\uBE44\uC2A4\uB97C \uC124\uACC4\uD588\uC2B5\uB2C8\uB2E4.',
                        image: matemate1,
                        imageAlt: '\uBA54\uC774\uD2B8\uBA54\uC774\uD2B8 \uD504\uB85C\uC81D\uD2B8 \uBC30\uACBD \uC774\uBBF8\uC9C0',
                    },
                    {
                        title: '\uD504\uB85C\uC81D\uD2B8 \uBAA9\uC801',
                        description:
                            '\uD559\uC0DD\uB4E4\uC758 \uC131\uD5A5/\uC0DD\uD65C \uC2B5\uAD00 \uAE30\uBC18 \uB9E4\uCE6D\uC73C\uB85C \uBD88\uD3B8\uD568\uC744 \uB0AE\uCD94\uACE0, \uAE0D\uC815\uC801\uC778 \uAE30\uC219\uC0AC \uACBD\uD5D8\uC744 \uC81C\uACF5\uD558\uB294 \uAC83\uC744 \uBAA9\uD45C\uB85C \uD588\uC2B5\uB2C8\uB2E4.',
                        image: matemate2,
                        imageAlt: '\uBA54\uC774\uD2B8\uBA54\uC774\uD2B8 \uD504\uB85C\uC81D\uD2B8 \uBAA9\uC801 \uC774\uBBF8\uC9C0',
                    },
                    {
                        title: 'UIUX \uB514\uC790\uC778',
                        description:
                            '\uBC18\uBCF5 \uC218\uC815\uC774 \uB9CE\uC740 C2C \uC11C\uBE44\uC2A4 \uD2B9\uC131\uC744 \uACE0\uB824\uD574, \uC785\uB825-\uC218\uC815-\uD655\uC778\uC774 \uC26C\uC6B4 \uD750\uB984\uC73C\uB85C UX\uB97C \uAD6C\uC131\uD588\uC2B5\uB2C8\uB2E4.',
                        image: matemate3,
                        imageAlt: '\uBA54\uC774\uD2B8\uBA54\uC774\uD2B8 UIUX \uC774\uBBF8\uC9C0',
                    },
                ],
            },
            {
                id: 2,
                name: 'gongting',
                headline: '\uC778\uC99D\uB41C<br>\uAC00\uAE4C\uC6B4 \uC0AC\uB78C\uB4E4\uACFC!<br>\uB108\uB791 \uB098\uB791 \uACF5\uD305! \u{1F64C}',
                title: '\uD55C\uAD6D\uACF5\uD559\uB300\uD559\uAD50 \uBC29\uD559 \uD504\uB85C\uC81D\uD2B8 - \uACF5\uD305',
                description:
                    '\uD32C\uB370\uBBF9 \uC774\uD6C4 \uD559\uC0DD \uAC04 \uAD50\uB958 \uD68C\uBCF5\uC744 \uC704\uD574 \uBE14\uB77C\uC778\uB4DC \uB9E4\uCE6D \uC11C\uBE44\uC2A4\uB97C \uB9CC\uB4E4\uC5C8\uACE0, \uC0AC\uC6A9\uC790 \uC5F0\uACB0 \uACBD\uD5D8\uC5D0 \uC9D1\uC911\uD574 \uD654\uBA74\uC744 \uAD6C\uC131\uD588\uC2B5\uB2C8\uB2E4.',
                contributions: [
                    '\uB514\uC790\uC778 50%',
                    '\uD37C\uBE14\uB9AC\uC2F1 100%',
                    'HTML',
                    'SCSS',
                    'Javascript',
                    'Figma',
                    'Adobe Photoshop',
                    'Adobe Illustrator',
                ],
                thumbnail: gongtingThumb,
                thumbnailAlt:
                    '\uD55C\uAD6D\uACF5\uD559\uB300\uD559\uAD50 \uBC29\uD559 \uD504\uB85C\uC81D\uD2B8\uC778 \uACF5\uD305 \uC11C\uBE44\uC2A4\uC758 \uCEA1\uCCD0 \uC774\uBBF8\uC9C0 \uBCF8\uC785\uB2C8\uB2E4.',
                detailTags: ['\uBAA8\uBC14\uC77C \uAE30\uBC18 \uC11C\uBE44\uC2A4', 'HTML5\uC640 node.js, MySql'],
                detailSections: [
                    {
                        title: '\uD504\uB85C\uC81D\uD2B8 \uBC30\uACBD',
                        description:
                            '\uC0AC\uD68C\uC801 \uAC70\uB9AC\uB450\uAE30 \uC2DC\uAE30 \uD559\uC0DD\uB4E4\uC758 \uACE0\uB9BD\uAC10\uC744 \uB0AE\uCD94\uAE30 \uC704\uD574 \uC0C1\uD638\uC791\uC6A9 \uC911\uC2EC \uC11C\uBE44\uC2A4\uB97C \uAE30\uD68D\uD588\uC2B5\uB2C8\uB2E4.',
                    },
                    {
                        title: '\uD504\uB85C\uC81D\uD2B8 \uBAA9\uD45C',
                        description:
                            '\uC0AC\uC6A9\uC790 \uC5F0\uACB0\uC131\uACFC \uC2E4\uBB34\uD615 \uC6F9 \uAC1C\uBC1C \uACBD\uD5D8\uC744 \uB3D9\uC2DC\uC5D0 \uD655\uBCF4\uD558\uB294 \uAC83\uC774 \uD575\uC2EC \uBAA9\uD45C\uC600\uC2B5\uB2C8\uB2E4.',
                    },
                    {
                        title: '\uB9E4\uCE6D \uC54C\uACE0\uB9AC\uC998',
                        description:
                            '\uC131\uBCC4/MBTI/\uCDE8\uBBF8/\uD2B9\uAE30 \uD56D\uBAA9\uC744 \uAE30\uC900\uC73C\uB85C \uC810\uC218\uB97C \uACC4\uC0B0\uD574 \uB9E4\uCE6D \uD6C4\uBCF4\uB97C \uCD94\uCC9C\uD588\uC2B5\uB2C8\uB2E4.',
                    },
                    {
                        title: '\uC2DC\uC2A4\uD15C \uAD6C\uD604',
                        description:
                            '\uD504\uB860\uD2B8\uC5D4\uB4DC, Node.js \uBC31\uC5D4\uB4DC, MySQL \uC800\uC7A5\uC18C, REST API \uAD6C\uC131\uC73C\uB85C \uAD6C\uD604\uD588\uC2B5\uB2C8\uB2E4.',
                    },
                    {
                        title: '\uAE30\uB300 \uD6A8\uACFC',
                        description:
                            '\uD559\uC0DD \uAC04 \uC5F0\uACB0 \uAC15\uD654\uC640 \uC11C\uBE44\uC2A4 \uC6B4\uC601 \uACBD\uD5D8 \uD655\uBCF4\uB77C\uB294 \uB450 \uAC00\uC9C0 \uACB0\uACFC\uB97C \uAE30\uB300\uD588\uC2B5\uB2C8\uB2E4.',
                    },
                ],
            },
        ];
        return (_ctx, _push, _parent, _attrs) => {
            _push(
                `<!--[--><div class="area-projects"><button class="swiper-btn btn-gotoPrev" aria-label="\uC774\uC804 \uD3EC\uD2B8\uD3F4\uB9AC\uC624 \uC815\uBCF4\uB85C \uC774\uB3D9\uD558\uB294 \uBC84\uD2BC"></button><button class="swiper-btn btn-gotoNext" aria-label="\uB2E4\uC74C \uD3EC\uD2B8\uD3F4\uB9AC\uC624 \uC815\uBCF4\uB85C \uC774\uB3D9\uD558\uB294 \uBC84\uD2BC"></button>`,
            );
            _push(
                ssrRenderComponent(
                    unref(Swiper),
                    {
                        class: 'swiper',
                        modules,
                        'slides-per-view': 1,
                        'auto-height': true,
                        autoplay: { delay: 1e4 },
                        pagination: { el: '.swiper-pagination', clickable: true },
                        navigation: { prevEl: '.btn-gotoPrev', nextEl: '.btn-gotoNext' },
                    },
                    {
                        default: withCtx((_, _push2, _parent2, _scopeId) => {
                            if (_push2) {
                                _push2(`<!--[-->`);
                                ssrRenderList(projects, (project) => {
                                    _push2(
                                        ssrRenderComponent(
                                            unref(SwiperSlide),
                                            {
                                                key: project.id,
                                                class: 'proj',
                                            },
                                            {
                                                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                                                    var _a;
                                                    if (_push3) {
                                                        _push3(
                                                            `<div class="content"${_scopeId2}><div class="proj-screen"${_scopeId2}><div class="proj-screen-mockup-wrap"${_scopeId2}><div class="proj-screen-mockup"${_scopeId2}><img${ssrRenderAttr('src', project.thumbnail)}${ssrRenderAttr('alt', project.thumbnailAlt)}${_scopeId2}></div></div></div><div class="proj-information"${_scopeId2}><div${_scopeId2}><h2${_scopeId2}>${(_a = project.headline) != null ? _a : ''}</h2><p class="title"${_scopeId2}>${ssrInterpolate(project.title)}</p><p${_scopeId2}>${ssrInterpolate(project.description)}</p><ul${_scopeId2}><!--[-->`,
                                                        );
                                                        ssrRenderList(project.contributions, (item) => {
                                                            _push3(`<li${_scopeId2}>${ssrInterpolate(item)}</li>`);
                                                        });
                                                        _push3(
                                                            `<!--]--></ul></div><button class="btn type-round bg-primary"${_scopeId2}>\uC0C1\uC138\uBCF4\uAE30</button></div></div>`,
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode('div', { class: 'content' }, [
                                                                createVNode('div', { class: 'proj-screen' }, [
                                                                    createVNode('div', { class: 'proj-screen-mockup-wrap' }, [
                                                                        createVNode('div', { class: 'proj-screen-mockup' }, [
                                                                            createVNode(
                                                                                'img',
                                                                                {
                                                                                    src: project.thumbnail,
                                                                                    alt: project.thumbnailAlt,
                                                                                },
                                                                                null,
                                                                                8,
                                                                                ['src', 'alt'],
                                                                            ),
                                                                        ]),
                                                                    ]),
                                                                ]),
                                                                createVNode('div', { class: 'proj-information' }, [
                                                                    createVNode('div', null, [
                                                                        createVNode(
                                                                            'h2',
                                                                            {
                                                                                innerHTML: project.headline,
                                                                            },
                                                                            null,
                                                                            8,
                                                                            ['innerHTML'],
                                                                        ),
                                                                        createVNode('p', { class: 'title' }, toDisplayString(project.title), 1),
                                                                        createVNode('p', null, toDisplayString(project.description), 1),
                                                                        createVNode('ul', null, [
                                                                            (openBlock(true),
                                                                            createBlock(
                                                                                Fragment,
                                                                                null,
                                                                                renderList(project.contributions, (item) => {
                                                                                    return (
                                                                                        openBlock(),
                                                                                        createBlock(
                                                                                            'li',
                                                                                            {
                                                                                                key: `${project.id}-${item}`,
                                                                                            },
                                                                                            toDisplayString(item),
                                                                                            1,
                                                                                        )
                                                                                    );
                                                                                }),
                                                                                128,
                                                                            )),
                                                                        ]),
                                                                    ]),
                                                                    createVNode(
                                                                        'button',
                                                                        {
                                                                            class: 'btn type-round bg-primary',
                                                                            onClick: ($event) => (activeProject.value = project),
                                                                        },
                                                                        '\uC0C1\uC138\uBCF4\uAE30',
                                                                        8,
                                                                        ['onClick'],
                                                                    ),
                                                                ]),
                                                            ]),
                                                        ];
                                                    }
                                                }),
                                                _: 2,
                                            },
                                            _parent2,
                                            _scopeId,
                                        ),
                                    );
                                });
                                _push2(`<!--]-->`);
                            } else {
                                return [
                                    (openBlock(),
                                    createBlock(
                                        Fragment,
                                        null,
                                        renderList(projects, (project) => {
                                            return createVNode(
                                                unref(SwiperSlide),
                                                {
                                                    key: project.id,
                                                    class: 'proj',
                                                },
                                                {
                                                    default: withCtx(() => [
                                                        createVNode('div', { class: 'content' }, [
                                                            createVNode('div', { class: 'proj-screen' }, [
                                                                createVNode('div', { class: 'proj-screen-mockup-wrap' }, [
                                                                    createVNode('div', { class: 'proj-screen-mockup' }, [
                                                                        createVNode(
                                                                            'img',
                                                                            {
                                                                                src: project.thumbnail,
                                                                                alt: project.thumbnailAlt,
                                                                            },
                                                                            null,
                                                                            8,
                                                                            ['src', 'alt'],
                                                                        ),
                                                                    ]),
                                                                ]),
                                                            ]),
                                                            createVNode('div', { class: 'proj-information' }, [
                                                                createVNode('div', null, [
                                                                    createVNode(
                                                                        'h2',
                                                                        {
                                                                            innerHTML: project.headline,
                                                                        },
                                                                        null,
                                                                        8,
                                                                        ['innerHTML'],
                                                                    ),
                                                                    createVNode('p', { class: 'title' }, toDisplayString(project.title), 1),
                                                                    createVNode('p', null, toDisplayString(project.description), 1),
                                                                    createVNode('ul', null, [
                                                                        (openBlock(true),
                                                                        createBlock(
                                                                            Fragment,
                                                                            null,
                                                                            renderList(project.contributions, (item) => {
                                                                                return (
                                                                                    openBlock(),
                                                                                    createBlock(
                                                                                        'li',
                                                                                        {
                                                                                            key: `${project.id}-${item}`,
                                                                                        },
                                                                                        toDisplayString(item),
                                                                                        1,
                                                                                    )
                                                                                );
                                                                            }),
                                                                            128,
                                                                        )),
                                                                    ]),
                                                                ]),
                                                                createVNode(
                                                                    'button',
                                                                    {
                                                                        class: 'btn type-round bg-primary',
                                                                        onClick: ($event) => (activeProject.value = project),
                                                                    },
                                                                    '\uC0C1\uC138\uBCF4\uAE30',
                                                                    8,
                                                                    ['onClick'],
                                                                ),
                                                            ]),
                                                        ]),
                                                    ]),
                                                    _: 2,
                                                },
                                                1024,
                                            );
                                        }),
                                        64,
                                    )),
                                ];
                            }
                        }),
                        _: 1,
                    },
                    _parent,
                ),
            );
            _push(`<div class="swiper-pagination"></div></div>`);
            if (unref(activeProject)) {
                _push(
                    `<div class="modal"><div class="modal-content active"><div class="modal-header"><h4>${ssrInterpolate(unref(activeProject).headline.replaceAll('<br>', ' '))}</h4><ul><!--[-->`,
                );
                ssrRenderList(unref(activeProject).detailTags, (tag) => {
                    _push(`<li>${ssrInterpolate(tag)}</li>`);
                });
                _push(
                    `<!--]--></ul><button class="btn type-round bg-black modal-close" aria-label="\uBAA8\uB2EC \uB2EB\uAE30 \uBC84\uD2BC">\uB2EB\uAE30</button></div><div class="modal-body"><div class="wrap"><!--[-->`,
                );
                ssrRenderList(unref(activeProject).detailSections, (section) => {
                    _push(`<section><h5>${ssrInterpolate(section.title)}</h5><p>${ssrInterpolate(section.description)}</p>`);
                    if (section.image) {
                        _push(
                            `<div class="wrap-img"><img${ssrRenderAttr('src', section.image)}${ssrRenderAttr('alt', section.imageAlt || section.title)}></div>`,
                        );
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
    },
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add('components/sections/ProjectsSection.vue');
    return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
    _push(
        `<div${ssrRenderAttrs(mergeProps({ class: 'area-information type-history' }, _attrs))}><div class="content"><h2>\uC81C \uBAA8\uB4E0 \uAC78<br>\uC18C\uAC1C\uD569\uB2C8\uB2E4 \u{1F44F}</h2><ul><li><p class="title">\uACBD\uB825<span>5\uB144\uCC28</span></p><ul><li>(\uC8FC)\uC81C\uC774\uCF65\uC2DC\uC2A4\uD15C<span>2019.06~2019.12</span><br>\uAC1C\uBC1C\uD300 / \uD559\uC2B5\uADFC\uB85C\uC790</li><li>\uC870\uC564\uC18C\uD504\uD2B8(\uC8FC)<span>2019.12~</span><br>UI/UX\uD300 / \uC8FC\uC784</li></ul></li><li><p class="title">\uD559\uB825</p><ul><li><span class="align">\uC11C\uC6B8\uC7A5\uC548\uC911\uD559\uAD50</span></li><li>\uC11C\uC6B8\uB514\uC9C0\uD14D\uACE0\uB4F1\uD559\uAD50</li><li><span class="align" title="\uCEF4\uD4E8\uD130\uC804\uC790\uACF5\uD559\uACFC \uC778\uACF5\uC9C0\uB2A5\uD2B8\uB799">\uD55C\uAD6D\uACF5\uD559\uB300\uD559\uAD50</span><span>(4.45/4.50)</span></li></ul></li><li><p class="title">\uC790\uACA9\uC99D</p><ul><li>NCS \uC778\uACF5\uC9C0\uB2A5 \uAC1C\uBC1C_L5<span>2025.06</span></li><li>\uAE30\uC5C5\uD604\uC7A5\uAD50\uC0AC 3\uAE09<span>2024.12</span></li><li>\uCEF4\uD4E8\uD130\uD65C\uC6A9\uB2A5\uB825 1\uAE09 (\uD544\uAE30)<span>2024.05</span></li><li>\uC815\uBCF4\uCC98\uB9AC\uAE30\uC0AC (\uD544\uAE30)<span>2023.08</span></li><li>NCS SW \uAC1C\uBC1C_L5<span>2022.12</span></li></ul></li></ul></div></div>`,
    );
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add('components/sections/HistorySection.vue');
    return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [['ssrRender', _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
    _push(
        `<footer${ssrRenderAttrs(_attrs)}><p>\uBCF8 \uD398\uC774\uC9C0\uB294 \uC0C1\uC5C5\uC801 \uBAA9\uC801\uC774 \uC544\uB2CC,<br>\uAC1C\uC778 \uD3EC\uD2B8\uD3F4\uB9AC\uC624\uC6A9\uC73C\uB85C \uC81C\uC791\uB418\uC5C8\uC2B5\uB2C8\uB2E4.</p><address>Copyright 2025. \uC740\uC601\uD658. All rights reserved.</address></footer>`,
    );
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add('components/sections/SiteFooter.vue');
    return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [['ssrRender', _sfc_ssrRender]]);
const useTheme = () => {
    const theme = useState('theme', () => 'dark');
    const setTheme = (nextTheme) => {
        theme.value = nextTheme;
    };
    const initTheme = () => {};
    return { theme, setTheme, initTheme };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
    __name: 'index',
    __ssrInlineRender: true,
    setup(__props) {
        useHead({
            title: '\uC6F9 \uD37C\uBE14\uB9AC\uC154 \uC740\uC601\uD658 \uD3EC\uD2B8\uD3F4\uB9AC\uC624',
            meta: [
                {
                    name: 'description',
                    content:
                        '\uB354 \uB098\uC740 \uB0B4\uC77C\uC744 \uC704\uD574 \uC27C \uC5C6\uC774 \uB2EC\uB824\uAC00\uB294 \uC6F9 \uD37C\uBE14\uB9AC\uC154 \uC740\uC601\uD658\uC785\uB2C8\uB2E4.',
                },
                { property: 'og:title', content: '\uC6F9 \uD37C\uBE14\uB9AC\uC154 \uC740\uC601\uD658 \uD3EC\uD2B8\uD3F4\uB9AC\uC624' },
                {
                    property: 'og:description',
                    content:
                        '\uB354 \uB098\uC740 \uB0B4\uC77C\uC744 \uC704\uD574 \uC27C \uC5C6\uC774 \uB2EC\uB824\uAC00\uB294 \uC6F9 \uD37C\uBE14\uB9AC\uC154 \uC740\uC601\uD658\uC785\uB2C8\uB2E4.',
                },
            ],
        });
        const { theme } = useTheme();
        watch(theme, (value) => {
            const body = (void 0).body;
            if (value === 'dark') {
                body.classList.add('mode-dark');
            } else {
                body.classList.remove('mode-dark');
            }
        });
        return (_ctx, _push, _parent, _attrs) => {
            const _component_SectionsWelcomeCanvas = _sfc_main$6;
            const _component_SectionsIntroSection = _sfc_main$5;
            const _component_SectionsInformationSection = _sfc_main$4;
            const _component_SectionsProjectsSection = _sfc_main$3;
            const _component_SectionsHistorySection = __nuxt_component_4;
            const _component_SectionsSiteFooter = __nuxt_component_5;
            _push(
                `<!--[--><section><button class="btn set-mode" aria-label="\uB2E4\uD06C\uBAA8\uB4DC, \uB77C\uC774\uD2B8\uBAA8\uB4DC \uC804\uD658"></button>`,
            );
            _push(ssrRenderComponent(_component_SectionsWelcomeCanvas, null, null, _parent));
            _push(ssrRenderComponent(_component_SectionsIntroSection, null, null, _parent));
            _push(ssrRenderComponent(_component_SectionsInformationSection, null, null, _parent));
            _push(ssrRenderComponent(_component_SectionsProjectsSection, null, null, _parent));
            _push(ssrRenderComponent(_component_SectionsHistorySection, null, null, _parent));
            _push(`</section>`);
            _push(ssrRenderComponent(_component_SectionsSiteFooter, null, null, _parent));
            _push(`<!--]-->`);
        };
    },
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add('pages/index.vue');
    return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CQeN5umF.mjs.map
