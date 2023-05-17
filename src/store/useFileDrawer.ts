import { defineStore } from 'pinia';

export const useFileDrawer = defineStore('fileDrawer', {
    state: () => ({ _files: new Map(), fetchedFiles: false }),
    getters: {
        paths: () => {
            let urlParams = new URLSearchParams(location.search);
            let poolsListStr = urlParams.get("pools");
            return poolsListStr.split(",");
        },
        files: (state) => {
            return state._files;
        }
    },
    actions: {
        async fetchUrlFiles() {
            let paths = this.paths;
            for (const path of paths) {
                let resp = await fetch(path);
                if (!resp.ok) {
                    console.error("No se encontro :(")
                    continue;
                }
                let contents = await resp.text()
                this._files.set(path, contents);
            }
            this.fetchedFiles = true;
        },
    }
});
