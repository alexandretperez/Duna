export let version = "1.0.0";

export type Callback<T> = (sender: T) => void;

export type CallbackArgs<TSender, TArgs> = (sender: TSender, args: TArgs) => void;

export type CaretPosition = {
    start: number,
    end: number,
    areEquals: boolean
}

export interface ElementDimension {
    width: number,
    height: number
}

export type Converter<TFrom, TTo> = (value: TFrom) => TTo;
