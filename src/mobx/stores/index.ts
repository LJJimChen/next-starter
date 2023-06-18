import { CounterStore } from "./counter";

export class RootStore {
    counterStore: CounterStore;

    constructor() {
        this.counterStore = new CounterStore();
    }
}
