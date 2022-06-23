import { defineStore } from 'pinia';
import { useWasm } from '../store/useWasm';
import { idListEq } from '../lib/gridUtils';
import { usePoolStore } from '../store/usePools';
import { useEngineResults } from './useEngineResults';

export const useFileStore = defineStore('file', {
    state: () => ({
        arrayFiles: [],
        fileContents: []
    }),
    actions: {
        deleteFile(file: File) {
            const poolStore = usePoolStore();
            const engineResults = useEngineResults();

            let index = this.arrayFiles.indexOf(file)
            if (index > -1) {
                this.arrayFiles.splice(index, 1)
                this.fileContents.splice(index, 1);
            }
            poolStore.resetEngineParams();
            engineResults.$reset();
        },
        async addFile(file: File) {
            let poolStore = usePoolStore();

            if (file.size >= 24000000) {
                throw new Error("El archivo es demasiado grande.");
            }
            if (file.type !== "text/csv") {
                throw new Error("El archivo no se encuentra en formato csv.");
            }
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
            for (const newPool of pools) {
                for (const existingPool of poolStore._unfilteredPools) {
                    if (idListEq(existingPool.pool_id.id_list, newPool.pool_id.id_list)) {
                        const idString = newPool.pool_id.id_list.join("/");
                        throw new Error(`Materias con id repetidos: ${idString}`);
                    }

                }
            }
            this.arrayFiles.push(file);
            this.fileContents.push(fileContents);
        }
    }
});
