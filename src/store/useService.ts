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
        }
    }
});
