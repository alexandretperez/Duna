const version = '1.1.6';

export { version };

export type Callback<T> = (sender: T) => void;

export type CallbackArgs<TSender, TArgs> = (sender: TSender, args: TArgs) => void;

export type CaretPosition = {
    start: number;
    end: number;
    areEquals: boolean;
};

export interface ElementDimension {
    width: number;
    height: number;
}

export type Converter<TFrom, TTo> = (value: TFrom) => TTo;
