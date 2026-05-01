import { ssrRenderSlot } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../server.mjs";
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
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-Dv0xosbg.js.map
