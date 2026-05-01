import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

export default defineNuxtPlugin(() => {
    ModuleRegistry.registerModules([AllCommunityModule]);
});
