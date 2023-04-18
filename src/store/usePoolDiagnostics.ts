import { defineStore } from 'pinia';
import { useWasm } from '../store/useWasm';
import { FILE_DRAWER_DIR, useFileDrawer } from "./useService";

class Diagnostic {
    ok: boolean;
    msg: string;
    line: number;
    col: number;

    constructor(ok: boolean) {
        this.ok = ok;
        this.msg = "OK";
        this.line = 0;
        this.col = 0;
    }
}

export const usePoolDiagnostics = defineStore('pool-diagnostics', {
    getters: {
        diagnostics: (state) => {
            let wasmApi = useWasm();
            let fileDrawer = useFileDrawer();
            // NOTE: It is assumed that wasmInit has already been called at this point
            if (!wasmApi.wasmReady || !fileDrawer.fetchedFiles) {
                console.warn("Diagnostics fetched without either initializing WASM or fetching files");
                return new Map();
            }
            let diagnostics = new Map();
            for (const [path, fileContents] of fileDrawer.files) {
                let wasmResult = null;
                try {
                    console.log(typeof fileContents)
                    wasmResult = wasmApi.initPools(fileContents);
                    diagnostics.set(path, new Diagnostic(true))
                } catch (e) {
                    const diagnostic = new Diagnostic(false);
                    diagnostic.msg = e.msg;
                    diagnostic.line = 0;
                    diagnostic.col = 0;
                    diagnostics.set(path, diagnostic);
                }
            }
            return diagnostics;
        }
    }
});
