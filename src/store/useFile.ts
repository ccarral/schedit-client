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

            if (file.size >= 24000000) {
                throw new Error("El archivo es demasiado grande.");
            }
            if (file.type !== "text/csv") {
                throw new Error("El archivo no se encuentra en formato csv.");
            }
            // Verifica si ya se ha añadido el archivo previamente
            for (const f of this.arrayFiles) {
                console.log(f);
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
