import { apiResponse } from "../utills/apiResponse";

export default defineEventHandler(() => {
  return apiResponse([
    {
      id: 1,
      name: "Portfolio Migration",
      stack: ["Nuxt3", "Pinia", "Axios", "SCSS", "Swiper", "Chart.js"],
      summary: "정적 포트폴리오를 Vue3 기반 구조로 전환 중입니다."
    }
  ]);
});
