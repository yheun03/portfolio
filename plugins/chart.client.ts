import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Chart
    }
  };
});
