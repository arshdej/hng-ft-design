/* eslint-disable */
declare module "*.svg" {
  const value: any;
  export default value;
}

type Nullable<T> = T | null;
type strnum = string | number;

type R = Record<string, any>;
type Obj<T> = Record<string, T>;

type Fn<T> = () => T;
type FnAny = () => any;
type FnArgs<Args, Result> = (args: Args) => Result;

type RecordOf<T, K> = { [key in K]: T };
type ValueOf<T> = T[keyof T];
