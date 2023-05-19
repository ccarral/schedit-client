import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Diagnostics from "../views/Diagnostics.vue";
const routes = [
    {
        path: "/schedit-client",
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: "/schedit-client/diagnostics",
        name: "Diagnostics",
        component: Diagnostics
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
