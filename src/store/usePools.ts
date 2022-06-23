import { defineStore } from 'pinia';
import { EngineParams } from '../lib/engineParams';
import { ScheduleView, idListEq } from '../lib/gridUtils';
import { useFileStore } from './useFile';
import { useWasm } from './useWasm';

export const usePoolStore = defineStore('pools', {
    state: () => ({
        pools: [],
        engineParams: new EngineParams(),
        poolsPoppedCache: []
    }),
    actions: {
        /// Agrega el pool a los parámetros del engine 
        addPoolToEngineParams(pool) {
            this.engineParams.addPool(pool);
            this.incEngineBound();
        },
        removePoolFromEngineParams(poolId) {
            let pool = this.engineParams.removePool(poolId);
            this.decEngineBound();
        },
        incEngineBound() {
            if (this.engineParams.bound < (this.engineParams.pool_list.length + this.engineParams.seeds.length)) {
                this.engineParams.bound++;
            }
        },
        decEngineBound() {
            if (this.engineParams.bound > 0) {
                this.engineParams.bound--;
            }
        },
        addSeedToEngineParams(group) {
            this.engineParams.addSeed(group);
            this.incEngineBound();
        },
        removeSeedFromEngineParams(group) {
            this.engineParams.removeSeed(group);
            this.decEngineBound();
        }
    },
    getters: {
        groups() {
            let groups = [];
            for (const currentPool of this._pools) {
                for (const gridList of currentPool.grid_list) {
                    groups.push(gridList);
                }
            }
            return groups;
        },
        // Regresa una vista de las materias contenidas en los pools
        subjects() {
            return this._pools.map((val) => ({
                name: val.grid_list[0].data.nombre,
                subject_id: val.pool_id
            }));

        },
        // No se debe de usar directamente. Evita que se llame initPools
        // cada vez que cambia un parámetro en los filtros.
        _unfilteredPools(): Array<Object> {
            const files = useFileStore();
            const wasm = useWasm();
            wasm.wasmInit();
            // Se asume que ya se llamó a wasm.init() y se validó que el
            // archivo es válido
            let poolsArray = [];
            for (const file of files.fileContents) {
                const { pools } = wasm.initPools(file);
                for (const pool of pools) {
                    poolsArray.push(pool);
                }
            }
            return poolsArray;
        },
        _pools(state) {
            let unfilteredPools = this._unfilteredPools;
            // Filter pools not in EngineParams
            return unfilteredPools.filter((pool) => {
                for (const paramsPool of state.engineParams.pool_list) {
                    if (idListEq(pool.pool_id.id_list, paramsPool.pool_id.id_list)) {
                        return false;
                    }
                }
                for (const group of state.engineParams.seeds) {
                    if (idListEq(pool.pool_id.id_list, group.pool_id.id_list)) {
                        return false;
                    }
                }
                return true;
            });
        },
        selectedSubjects: (state) => {
            return state.engineParams.subjects;
        },
        selectedGroupsAsScheduleView(): ScheduleView {
            let scheduleView = new ScheduleView();
            for (const subject of this.selectedGroups) {
                scheduleView.pushGrid(subject);
            }
            return scheduleView;
        },
        selectedGroups: (state) => {
            return state.engineParams.seeds;
        }
    }
});
