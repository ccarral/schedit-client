import { defineStore } from 'pinia';
import { useWasm } from '../store/useWasm';
import { usePoolStore } from "./usePools";
const FILE_DRAWER_DIR = "files"

export const useFileDrawer = defineStore('fileDrawer', {
    state: () => ({ files: [] }),
    actions: {
        async fetchUrlFiles() {
            let files = []
            let urlParams = new URLSearchParams(location.search);
            let poolsListStr = urlParams.get("pools")
            let pools = poolsListStr.split(",");
            for (const pool of pools) {
                let resp = await fetch(`${FILE_DRAWER_DIR}/${pool}.csv`);
                if (!resp.ok) {
                    console.error("No se encontro :(")
                    continue;
                }
                let contents = await resp.text()
                this.files.push(contents);
            }
        },
        async addFile(file: File) {
            let poolStore = usePoolStore();

            // Verifica si ya se ha añadido el archivo previamente
            for (const f of this.arrayFiles) {
                if (f.name === file.name
                    && f.type === file.type
                ) {
                    throw new Error(`El archivo ${file.name} ya ha sido cargado previamente`);
                }
            }

            const fileContents = await file.text();

            let wasm = useWasm();
            if (!wasm.wasmReady) {
                await wasm.wasmInit();
            }
            // Esto sirve para validar que el formato del archivo es
            // válido. Arroja excepción si no lo es.
            let wasmResult = null;
            try {
                wasmResult = wasm.initPools(fileContents);
            } catch (e) {
                throw new Error(`Formato de plantilla no reconocido: ${e.msg}`)
            }
            let { pools } = wasmResult;
            this.arrayFiles.push(file);
            this.fileContents.push(fileContents);
        }
    }
});
