import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const apiResponse = (data) => ({
  success: true,
  data
});

const health_get = defineEventHandler(() => {
  return apiResponse([
    {
      id: 1,
      name: "Portfolio Migration",
      stack: ["Nuxt3", "Pinia", "Axios", "SCSS", "Swiper", "Chart.js"],
      summary: "\uC815\uC801 \uD3EC\uD2B8\uD3F4\uB9AC\uC624\uB97C Vue3 \uAE30\uBC18 \uAD6C\uC870\uB85C \uC804\uD658 \uC911\uC785\uB2C8\uB2E4."
    }
  ]);
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
