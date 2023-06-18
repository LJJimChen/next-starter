import { makeAutoObservable } from "mobx";

/**
 * This file is generated as an example of Mobx Stores
 *
 * To learn more about Mobx and state management,
 * please visit https://mobx.js.org/README.html
 */

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type MyType = {
    prop1: string;
    prop2: {
        nestedProp1: number;
        nestedProp2: {
            deepProp: boolean;
            data: number[];
        };
    };
};
export class CounterStore {
    count: DeepReadonly<MyType> = {
        prop1: "111",
        prop2: {
            nestedProp1: 11,
            nestedProp2: {
                deepProp: false,
                data: [0, 1],
            },
        },
    };

    constructor() {
        makeAutoObservable(this);
    }
    // get count() {
    //     return { ...this._count };
    // }

    increase = () => {
        // this.count.prop2.nestedProp1++;
        // this.count.prop2.nestedProp2.data.push(this.count.prop1.value);
    };

    decrease = () => {
        // this.count.prop2.nestedProp1--;
    };

    public get doubleCount() {
        console.log("recompute doube count", this.count.prop2.nestedProp1 * 2);
        return { value: this.count.prop2.nestedProp1 * 2 };
    }
}
