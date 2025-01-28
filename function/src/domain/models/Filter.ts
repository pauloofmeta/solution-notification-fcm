export type IFilter<T> = {
  [K in keyof T]?: T[K] | { [operator: string]: unknown };
};
