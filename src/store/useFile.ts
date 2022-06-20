import { defineStore } from 'pinia';
import { usePoolStore } from '../store/usePools';
import { useWasm } from '../store/useWasm';

export const useFileStore = defineStore('file', {
    state: () => ({
        arrayFiles: [],
        fileContents: []
    }),
    getters: {},
    actions: {
        // agrega los archivos de la UoloadFile
        addAllFiles(files) {
            this.arrayFiles = files;
        },
        deleteFile(file: File) {
            let index = this.arrayFiles.indexOf(file)
            if (index > -1) {
                this.arrayFiles.splice(index, 1)
            }
        },
        async addFile(file: File) {
            // TODO: Esta función debería de añadir un archivo a arrayFiles
            const fileContents = await file.text();

            let wasm = useWasm();
            if (!wasm.wasmReady) {
                await wasm.wasmInit();
            }
            // Esto sirve para validar que el formato del archivo es
            // válido. Arroja excepción si no lo es.
            try {
                wasm.initPools(fileContents);
            } catch (e) {
                throw new Error(`Formato de plantilla no reconocido: ${e.msg}`)
            }
            this.arrayFiles.push(file);
            this.fileContents.push(fileContents);
        }
    }
});
