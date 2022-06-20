import { defineStore } from 'pinia';
import init, { api_engine_main, api_init_pools } from "uaemex-horarios";
// NOTA: NO me preguntes por qué es necesaria esta lína. Tiene que ver con un
// problema con vite, que al empaquetar y transformar los imports de wasm,
// no reconoce una url y regresa error. Básicamente se describe en este
// issue: https://github.com/vitejs/vite/discussions/2584
import wasmURL from "uaemex-horarios/uaemex_horarios_bg.wasm?url";
export const useWasm = defineStore('wasm-api', {
    state: () => ({
        wasmReady: false,
        initPools: null,
        engineMain: null,
    }),
    actions: {
        async wasmInit() {
            if (!this.wasmReady) {
                await init(wasmURL);
                this.initPools = api_init_pools;
                this.engineMain = api_engine_main;
                this.wasmReady = true;
            }
        }
    }
})
