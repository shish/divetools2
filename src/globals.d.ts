declare module '*.jpg';
declare module 'hyperapp';

type MyInputEvent = {
    target: HTMLTextAreaElement;
};

type Bar = number & { __bar__: void };
type Meters = number & { __meters__: void };
type Fraction = number & { __fraction__: void };
